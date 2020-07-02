import { Injectable } from '@angular/core';

//Constructor
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//Observables
import { Subject} from 'rxjs';
import {map} from 'rxjs/operators';

//Modelo
import { Destinatary } from '../models/destinatary';

@Injectable({
  providedIn: 'root'
 })

export class DestinataryService {
  private destinatarys: Destinatary[] = [];
  private destinataryUpdated = new Subject<Destinatary[]>();
  readonly URL_API = "http://localhost:3000/diligence/destinatary";

  constructor(private http : HttpClient, private router: Router) {}
    getAllDestinatarys(){
      this.http
      .get<{success: Boolean, data: any}>(
        `${this.URL_API}`
      )
      .pipe(map((destinataryData) =>{
        return destinataryData.data.map(destinatary => {
          return {
            name: destinatary.name,
            address: destinatary.address,
            contact: destinatary.contact,
            cost: destinatary.cost,
            id: destinatary._id
          };
        });
      }))
      .subscribe(transformedDestinatarys => {
        this.destinatarys = transformedDestinatarys;
        this.destinataryUpdated.next([...this.destinatarys]);
      });
    }

    getDestinataryUpdateListener(){
      return this.destinataryUpdated.asObservable();
    }

    getSingleDestinatary(id: String){
      return this.http.get<{success: Boolean, data: any}>(
        `${this.URL_API}/${id}`
      )
    }
    createDistanatarys(destinatary : Destinatary){
      this.http
      .post<{success: Boolean, data: any}>(
        `${this.URL_API}`, destinatary
      )
      .subscribe(res =>{
        if(res.success === true){
          let id = res.data._id;
          destinatary.id = id;
          this.destinatarys.push(destinatary);
          this.destinataryUpdated.next([...this.destinatarys]);
          this.router.navigate(['/destinos']);
        }
      });
    }

    updateDestinatary(destinatary: Destinatary){
      this.http.put<{success: Boolean, data: Destinatary}>(
        `${this.URL_API}/${destinatary.id}`, destinatary
      ).subscribe(res => {
        this.destinataryUpdated.next([...this.destinatarys]);
        this.router.navigate(['/destinos']);
      });
    }
    deleteDestinatary(id: String){
      this.http
      .delete<{success: Boolean, msg: String}>(
        `${this.URL_API}/${id}`
      )
      .subscribe(res => {
        if(res.success === true){
          this.destinatarys = this.destinatarys.filter(destinatary => destinatary.id !== id);
          this.destinataryUpdated.next([...this.destinatarys]);
        }
      });
    }
}
