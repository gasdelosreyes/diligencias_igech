import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import { Destinatary } from '../models/destinatary';

@Injectable({
  providedIn: 'root'
 })

export class DestinataryService {
  private destinatarys: Destinatary[] = [];
  private destinataryUpdated = new Subject<Destinatary[]>();
  readonly URL_API = "http://localhost:3000/diligence/destinatary";

  constructor(private http : HttpClient) {}
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
    createDistanatarys(name: String, address: String, contact: String, cost: Number){
      const destinatary : Destinatary = {id: null, name, address, contact, cost};
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
        }
      });
    }
    deleteDestinatary(id: String){
      this.http
      .delete<{success: Boolean, msg: String}>(
        `${this.URL_API}/id`
      )
      .subscribe(res => {
        if(res.success === true){
          this.destinatarys = this.destinatarys.filter(destinatary => destinatary.id !== id);
          this.destinataryUpdated.next([...this.destinatarys]);
        }
      })
    }
}
