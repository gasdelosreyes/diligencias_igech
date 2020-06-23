import { Component, OnInit } from '@angular/core';
import { DestinataryService } from '../../services/destinatary.service';
import { NgForm } from '@angular/forms';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-destinatary',
  templateUrl: './destinatary.component.html',
  styleUrls: ['./destinatary.component.css']
})
export class DestinataryComponent implements OnInit {

  constructor(public service : DestinataryService) { }
  addDestinatary(form: NgForm){
    if(form.invalid){
      return;
    }
    this.service.createDistanatarys(form.value.name, form.value.address, form.value.contact, form.value.cost);
    form.resetForm();
  }
  ngOnInit(): void {
  }

}
