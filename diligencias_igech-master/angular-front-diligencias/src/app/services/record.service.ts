import { Injectable } from '@angular/core';
import { Record } from 'app/models/record';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private records : Record[] = [];
  private recordUpdated = new Subject<Record[]>();

  readonly URL_API = 'http://localhost:3000/diligence/record';

  constructor(private http: HttpClient, private router : Router) { }
  getAllRecord(){
    this.http
    .get<{success: Boolean, data: any}>(
      `${this.URL_API}`
    )
    .pipe(map((res) => {
      return res.data.map(record => {
        return {
          number: record.number,
          cover: record.cover,
          secretary: record.secretary.number,
          court: record.secretary.court.name,
          debtor: record.debtor,
          id: record._id
        };
      });
    }))
    .subscribe(transformedRecords => {
      this.records = transformedRecords;
      this.recordUpdated.next([...this.records]);
    });
  }

  getRecordUpdateListener(){
    return this.recordUpdated.asObservable();
  }

  getSingleRecord(recordId : String){
    return this.http.get<{success: Boolean, data: Record}>(
      `${this.URL_API}/${recordId}`
    );
  }

  createRecord(record : Record){
    this.http
    .post<{success: Boolean, data: Record}>(
      `${this.URL_API}`, record
    ).subscribe(res => {
      if(res.success === true){
        record.id = res.data.id;
        this.records.push(record);
        this.recordUpdated.next([...this.records]);
      }
    });
  }

  updateRecord(record: Record){
    this.http.put<{success: Boolean, data: Record}>(
      `${this.URL_API}/${record.id}`, record
    ).subscribe( res => {
      if(res.success === true){
        this.recordUpdated.next([...this.records]);
      }
    })
  }

  deleteRecord(recordId: String){
    this.http.delete<{success: Boolean, msg: String}>(
      `${this.URL_API}/${recordId}`
    ).subscribe( res => {
      if(res.success === true){
        this.records = this.records.filter(record => record.id !== recordId);
        this.recordUpdated.next([...this.records]);
      }
    });
  }
}
