import { Component, OnInit } from '@angular/core';
import { DestinataryService } from '../../services/destinatary.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Destinatary } from '../../models/destinatary';


@Component({
  selector: 'app-destinatary',
  templateUrl: './destinatary.component.html',
  styleUrls: ['./destinatary.component.css']
})
export class DestinataryComponent implements OnInit {

  public mode : String;
  private destinataryId : String;
  private destinatary: Destinatary;

  constructor(public service : DestinataryService, public router: ActivatedRoute) { }

  saveDestinatary(form: NgForm){
    if(form.invalid){
      return;
    }
    this.destinatary = {id: null, name: form.value.name, address: form.value.address, contact: form.value.contact, cost: form.value.cost }
    if(this.mode === "create"){
      this.service.createDistanatarys(this.destinatary);
    } else{
      this.destinatary.id = this.destinataryId;
      this.service.updateDestinatary(this.destinatary);
    }
    form.resetForm();
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("destinataryId")){
        this.mode = "edit";
        this.destinataryId = paramMap.get("destinataryId");
        this.service.getSingleDestinatary(this.destinataryId).subscribe(res => {
        this.destinatary =  res.data
        })
      } else{
        this.mode = "create";
        console.log(this.mode);
        this.destinataryId = null;
      }
    });
  }

}
