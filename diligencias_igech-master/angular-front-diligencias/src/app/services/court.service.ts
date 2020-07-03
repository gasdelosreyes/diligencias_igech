import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import { Court } from '../models/court';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CourtService {

	// selectedCourt:Court;
	private courts: Court[] = [];
    private courtUpdated = new Subject<Court[]>();

    readonly URL_API ='http://localhost:3000/diligence/court';


    constructor(private http : HttpClient, private router: Router) {}
     getAllCourts(){
      this.http
      .get<{success: Boolean, data: any}>(
        `${this.URL_API}`
      )
      .pipe(map((courtData) =>{
        return courtData.data.map(court => {
          return {
            name: court.name,
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

    getCourtUpdatedListener(){
      return this.courtUpdated.asObservable();
    }

    getSingleCourt(courtId: String){
      return this.http.get<{success: Boolean, data: Court}>(
        `${this.URL_API}/${courtId}`
      );
    }

    createCourts(court : Court){
      this.http
      .post<{success: Boolean, data: Court}>(
        `${this.URL_API}`, court
      )
      .subscribe(res =>{
        if(res.success === true){
          let id = res.data.id;
          court.id = id;
          this.courts.push(court);
          this.courtUpdated.next([...this.courts]);
          this.router.navigate(['/juzgados']);
        }
      });
    }

    updateCourt(court: Court){
      this.http.put<{success: Boolean, data: Court}>(
        `${this.URL_API}/${court.id}`, court
      ).subscribe(res => {
        this.courtUpdated.next([...this.courts]);
        this.router.navigate(['/juzgados']);
      });
    }

    delteCourt(courtId: String){
      this.http.delete<{success: Boolean, msg: String}>(
        `${this.URL_API}/${courtId}`
      ).subscribe(res => {
        if(res.success === true){
          this.courts = this.courts.filter(court => court.id !== courtId);
          this.courtUpdated.next([...this.courts]);
        }
      });
    }
}
