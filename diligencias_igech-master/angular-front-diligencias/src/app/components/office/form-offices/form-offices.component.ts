import { Component, OnInit, Inject } from '@angular/core';
import { Office } from '../../../models/office';
import { Destinatary } from '../../../models/destinatary';
import { OfficeService } from '../../../services/office.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListOfficesComponent } from '../list-offices/list-offices.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-offices',
  templateUrl: './form-offices.component.html',
  styleUrls: ['./form-offices.component.css']
})
export class FormOfficesComponent implements OnInit {
  public mode : String;

  //Types Array
  public typeArray = [
    {name:'Informe'},
    {name:'Embargo'},
    {name:'Ampliación de Embargo'}
  ]
  public state : String;
  public selectedType : String;
  //Get the record id from URL
  private recordId : String;

  //Get the destinatarys from DB
  private destinataryId : String;
  private destinataryArray : Destinatary[];

  private officeId : String;
  private office : Office;


  constructor(
    public service : OfficeService,
    public router : ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) data: {route : ActivatedRoute, id: String},
    private dialogRef : MatDialogRef<ListOfficesComponent>
  ) {
    this.router.paramMap.subscribe((paramMap : ParamMap) => {
      if(paramMap.has("recordId")){
        this.recordId = paramMap.get("recordId");
      }
      });
   }

  ngOnInit(): void {
    if(!this.officeId){
      this.mode = 'create';
      this.officeId = null;
      this.state = 'Suscripción'
    }else{
      this.mode = 'edit';
      this.service.getSingleOffice(this.officeId).subscribe(res => {
        this.office = res.data;
        this.selectedType = res.data.typeOffice;
      })
    }
  }

  saveOffice(form : NgForm){
    if(form.invalid){
      return;
    }
    this.office = {
      id: this.officeId,
      number: form.value.number,
      record: this.recordId,
      destinatary: this.destinataryId,
      typeOffice:this.selectedType,
      state: this.state
    }
    if(this.mode === 'create'){
      this.service.createOffice(this.office);
    }else{
      this.service.updateOffice(this.office);
    }
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }
}
