import { Injectable } from '@angular/core';
import { Secretary } from '../models/secretary';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {
  private secretarys : Secretary[] =[];
  private secretaryUpdated = new Subject<Secretary[]>();

  readonly URL_API_COURT = `http://localhost:3000/diligence/court`;
  readonly URL_API_SECRETARY = `http://localhost:3000/diligence/secretary`;

  constructor(private http: HttpClient, private router: Router) { }
  getAllSecretarys(courtId : String){
    this.http
    .get<{success: true, data: any}>(
      `${this.URL_API_COURT}/${courtId}/secretary`
    )
    .pipe(map((secretaryData) => {
      return secretaryData.data.map(secretary => {
          return {
            number: secretary.number,
            court: secretary.court,
            description: secretary.description,
            id: secretary._id
          };
      });
    }))
    .subscribe(transformedSecretarys => {
      this.secretarys = transformedSecretarys;
      this.secretaryUpdated.next([...this.secretarys]);
    })
  }
  getSecretaryUpdatedListener(){
    return this.secretaryUpdated.asObservable();
  }

  getSingleSecretary(secretaryId){
    return this.http.get<{success: Boolean, data: Secretary}>(
      `${this.URL_API_SECRETARY}/${secretaryId}`
    );
  }

  getDropdownSecretary(courtId){
    return this.http.get<{success: Boolean, data: any}>(
      `${this.URL_API_COURT}/${courtId}/secretary`
    );
  }

  createSecretary(secretary: Secretary){
    this.http
    .post<{success: Boolean, data: Secretary}>(
      `${this.URL_API_COURT}/${secretary.court}/secretary/`, secretary
    )
    .subscribe(res =>{
      if(res.success === true){
        let id = res.data.id;
        secretary.id = id;
        this.secretarys.push(secretary);
        this.secretaryUpdated.next([...this.secretarys]);
      }
    });
  }
  updateSecretary(secretary : Secretary){
    this.http.put<{success: Boolean, data: Secretary}>(
      `${this.URL_API_SECRETARY}/${secretary.id}`, secretary
    ).subscribe(res => {
      if(res.success === true){
        this.secretaryUpdated.next([...this.secretarys]);
      }
    });
  }

  deleteSecretary(secretaryId: String){
    this.http.delete<{success: Boolean, msg: String}>(
      `${this.URL_API_SECRETARY}/${secretaryId}`
    ).subscribe(res => {
      if(res.success === true){
        this.secretarys = this.secretarys.filter(secretary => secretary.id !== secretaryId);
        this.secretaryUpdated.next([...this.secretarys]);
      }
    });
  }
}
