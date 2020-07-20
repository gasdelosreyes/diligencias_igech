import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Record } from '../../../models/record';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListRecordComponent } from '../list-record/list-record.component';

import { RecordService } from '../../../services/record.service';
import { SecretaryService } from '../../../services/secretary.service';
import { CourtService } from '../../../services/court.service';
import { Subscription } from 'rxjs/Subscription';
import { Court } from '../../../models/court';
import { Secretary } from '../../../models/secretary';

@Component({
  selector: 'app-form-record',
  templateUrl: './form-record.component.html',
  styleUrls: ['./form-record.component.css']
})
export class FormRecordComponent implements OnInit {
  public mode : String;
  private recordId: String;
  private record : Record;

  public selectedCourt: Court;
  public courtArray : Court[];

  public selectedSecretary: Secretary;
  public secretaryArray: Secretary[];

  public subscription : Subscription;

  constructor(
    public serviceRecord : RecordService,
    public serviceSecretary : SecretaryService,
    public serviceCourt: CourtService,
    public router : ActivatedRoute,
    @Inject (MAT_DIALOG_DATA) data: {route: Router, id: String},
    private dialogRef: MatDialogRef<ListRecordComponent>
  ) {
    this.recordId = data.id;
  }

  ngOnInit(): void {
    if(!this.recordId){
      this.mode = 'create';
      this.recordId = null
      this.serviceCourt.getDropdown().subscribe(res => {
        this.courtArray = res.data;
      })
    }else{
      this.mode = 'edit';
      this.serviceRecord.getSingleRecord(this.recordId).subscribe(res => {
        this.record = res.data;
      });
    }
  }

  onSelect(courtId: any){
    this.serviceSecretary.getDropdownSecretary(courtId).subscribe(res => {
      this.secretaryArray = res.data;
      console.log(this.secretaryArray);
    })
  }

  saveRecord(form: NgForm){
    if(form.invalid){
      return;
    }
    this.record = {id: null, number: form.value.number, cover: form.value.cover, secretary: form.value.secretary, debtor: form.value.debtor }
    if(this.mode === "create"){
      this.serviceRecord.createRecord(this.record);
    }else{
      this.record.id = this.recordId;
      this.serviceRecord.updateRecord(this.record);
    }
    this.dialogRef.close();
  }
}
