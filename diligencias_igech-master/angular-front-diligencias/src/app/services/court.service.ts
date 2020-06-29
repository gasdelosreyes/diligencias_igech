import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Court} from '../models/court';

@Injectable({
  providedIn: 'root'
})
export class CourtService {

	selectedCourt:Court;
    readonly URL_API ='http://localhost:3000/api/employees';

  
}
