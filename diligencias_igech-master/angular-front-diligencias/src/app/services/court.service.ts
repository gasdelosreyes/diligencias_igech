import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {Court} from '../models/court';

@Injectable({
  providedIn: 'root'
})
export class CourtService {

	// selectedCourt:Court;
	private courts: Court[] = [];
    private courtUpdated = new Subject<Court[]>();

    readonly URL_API ='http://localhost:3000/diligence/court';


    constructor(private http : HttpClient) {}
     getAllCourts(){
      this.http
      .get<{success: Boolean, data: any}>(
        `${this.URL_API}`
      )
      .pipe(map((courtData) =>{
        return courtData.data.map(court => {
          return {
            number: court.number,
            description: court.description,
            address: court.address,            
            id: court._id
          };
        });
      }))
      .subscribe(transformedCourts => {
        this.courts = transformedCourts;
        this.courtUpdated.next([...this.courts]);
      });
    }

    // MÉTODO PARA GUARDAR UN NUEVO JUZGADO
    createCourts(number: String, description: String, address: String){
      const court : Court = {id: null, number, description, address};
      this.http
      .post<{success: Boolean, data: any}>(
        `${this.URL_API}`, court
      )
      .subscribe(res =>{
        if(res.success === true){
          let id = res.data._id;
          court.id = id;
          this.courts.push(court);
          this.courtUpdated.next([...this.courts]);
        }
      });
    }

  
}
