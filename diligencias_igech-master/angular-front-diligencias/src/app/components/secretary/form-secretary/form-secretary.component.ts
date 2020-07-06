import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecretaryService } from '../../../services/secretary.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Secretary } from 'app/models/secretary';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListSecretaryComponent } from '../list-secretary/list-secretary.component';

@Component({
  selector: 'app-form-secretary',
  templateUrl: './form-secretary.component.html',
  styleUrls: ['./form-secretary.component.css']
})

export class FormSecretaryComponent implements OnInit {
  public mode : String;
  private courtId: String;
  private secretaryId: String;
  private secretary: Secretary;

  constructor(
    public service : SecretaryService
    , public router: ActivatedRoute
    , @Inject(MAT_DIALOG_DATA) data: {route: ActivatedRoute}
    , private dialogRef: MatDialogRef<ListSecretaryComponent>
    ) {
      data.route.params.subscribe(params => {this.courtId = params.courtId});
    }
  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap : ParamMap) => {
      if(paramMap.has("courtId") && paramMap.has("secretaryId")){
        this.mode = 'edit';
        this.secretaryId = paramMap.get("secretaryId");
        this.courtId = paramMap.get("courtId");
        this.service.getSingleSecretary(this.secretaryId).subscribe(res => {
          this.secretary = res.data;
        });
      }else{
        this.mode = 'create';
        this.secretaryId = null;
      }
    });
  }
  saveSecretary(form: NgForm){
    if(form.invalid){
      return;
    }
    this.secretary = {id: null, number: form.value.number,court:this.courtId, description: form.value.description};
    if(this.mode === "create"){
      this.service.createSecretary(this.secretary);
    }else{
      this.secretary.id = this.secretaryId;
      this.service.updateSecretary(this.secretary);
    }
    this.dialogRef.close();
  }
}
