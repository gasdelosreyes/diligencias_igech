import { Component, OnInit } from '@angular/core';
import { DestinataryService } from '../../services/destinatary.service';
import { NgForm } from '@angular/forms';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

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
