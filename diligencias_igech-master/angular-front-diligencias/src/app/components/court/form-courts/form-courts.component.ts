import { Component, OnInit } from '@angular/core';
import { CourtService } from '../../../services/court.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Court } from 'app/models/court';


@Component({
  selector: 'app-form-courts',
  templateUrl: './form-courts.component.html',
  styleUrls: ['./form-courts.component.css']
})
export class FormCourtsComponent implements OnInit {
  private mode : String;
  private courtId: String;
  private court: Court;

  constructor(public service : CourtService, public router: ActivatedRoute) { }
  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap : ParamMap) => {
      if(paramMap.has("courtId")){
        this.mode = 'edit';
        this.courtId = paramMap.get("courtId");
        this.service.getSingleCourt(this.courtId).subscribe(res => {
          this.court = res.data;
        });
      }
    });
  }
  saveCourt(form: NgForm){
    if(form.invalid){
      return;
    }
    this.court = {id: null, name: form.value.name, description: form.value.description, address: form.value.address};
    if(this.mode === "create"){
      this.service.createCourts(this.court);
    }else{
      this.court.id = this.courtId;
      this.service.updateCourt(this.court);
    }
    form.resetForm();
  }
}
