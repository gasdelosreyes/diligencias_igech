import { Component, OnInit, ViewChild } from '@angular/core';
import { Record } from '../../../models/record';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/Subscription';
import { RecordService } from '../../../services/record.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormRecordComponent } from '../form-record/form-record.component';

@Component({
  selector: 'app-list-record',
  templateUrl: './list-record.component.html',
  styleUrls: ['./list-record.component.css']
})
export class ListRecordComponent implements OnInit {
  public record : Record [] = [];
  public dataSource : MatTableDataSource<Record>;
  private subscription : Subscription;
  constructor(private service : RecordService, public router: ActivatedRoute, private dialog: MatDialog) { }
  displayedColumns: String[] = ['number','cover','debtor','secretary'];

  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  openDialog(id: String){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if(id === undefined){
      dialogConfig.data = {router : this.router};
    }else{
      dialogConfig.data = {router: this.router, id};
    }
    let dialogRef = this.dialog.open(FormRecordComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
      this.ngOnInit();
    });
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap : ParamMap) => {
        this.service.getAllRecord();
        this.subscription = this.service.getRecordUpdateListener()
          .subscribe((data : Record[]) => {
            this.record = data;
            this.dataSource = new MatTableDataSource<Record>(this.record);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
    });
  }

}
