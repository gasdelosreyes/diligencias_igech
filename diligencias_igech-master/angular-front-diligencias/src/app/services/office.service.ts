import { Injectable } from '@angular/core';
import { Office } from '../models/office';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private offices : Office[] = [];
  private officesUpdated = new Subject<Office[]>();

  readonly URL_API_OFFICE = 'http://localhost:3000/diligence/office';

  constructor(private http : HttpClient, private router : Router) {
  }
  createOffice(office: Office){
    this.http
    .post<{success:Boolean, data: any}>(
      `${this.URL_API_OFFICE}`,office
    ).subscribe(res => {
      if(res.success === true){
        office.id = res.data.id;
        this.offices.push(office);
        this.officesUpdated.next([...this.offices]);
      }
    });
  }

  getAllOffices(){
    this.http
    .get<{msg: Boolean, data:any}>(
      `${this.URL_API_OFFICE}`
    )
    .pipe(map((res) => {
      return res.data.map(office => {
        console.log(office);
        return {
          number: office.number,
          record: office.record.number,
          destinatary: office.destinatary.name,
          typeOffice: office.typeOffice,
          state: office.state,
          createdAt: office.createdAt,
          id: office._id
        };
      });
    }))
    .subscribe(res => {
      this.offices = res;
      this.officesUpdated.next([...this.offices]);
    });
  }

  getOfficesUpdatedListener(){
    return this.officesUpdated.asObservable();
  }

  getSingleOffice(officeId : String){
    return this.http
    .get<{success: Boolean, data: Office}>(
      `${this.URL_API_OFFICE}/${officeId}`
    )
  }

  updateOffice(office: Office){
    this.http
    .put<{success: Boolean, data: any}>(
      `${this.URL_API_OFFICE}/${office.id}`,office
    ).subscribe(res => {
      if(res.success === true){
        this.officesUpdated.next([...this.offices]);
      }
    });
  }

  deleteOffice(officeId : String){
    this.http
    .delete<{success: Boolean, msg: String}>(
      `${this.URL_API_OFFICE}/${officeId}`
    )
    .subscribe(res => {
      if(res.success === true){
        this.offices = this.offices.filter(office => office.id !== officeId);
        this.officesUpdated.next([...this.offices]);
      }
    });
  }
}
