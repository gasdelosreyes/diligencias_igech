import { Component, OnInit } from '@angular/core';
import { CourtService } from '../../services/court.service';
import { NgForm } from '@angular/forms';
// import { formatNumber } from '@angular/common';
@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {

 constructor(public service : CourtService) { }
  addCourt(form: NgForm){
    if(form.invalid){
      return;
    }
    this.service.createCourts(form.value.number, form.value.description, form.value.address);
    form.resetForm();
  }


  ngOnInit(): void {
  }

}
