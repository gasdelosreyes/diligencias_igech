import { Component, OnInit, ViewChild } from '@angular/core';
import { Office } from 'app/models/office';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/Subscription';
import { OfficeService } from '../../../services/office.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormOfficesComponent } from '../form-offices/form-offices.component';

@Component({
  selector: 'app-list-offices',
  templateUrl: './list-offices.component.html',
  styleUrls: ['./list-offices.component.css']
})
export class ListOfficesComponent implements OnInit {
  private recordId : String;
  public office : Office[] = [];
  public dataSource: MatTableDataSource<Office>;
  private subscription : Subscription;

  constructor(
    private service : OfficeService,
    private dialog : MatDialog,
    public router : ActivatedRoute
  ) { }

  public displayedColumns : String[] = ['number','destinatary','type','state','date','action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort : MatSort;

  openDialog(id: String){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if(id === undefined){
      dialogConfig.data = {router : this.router};
    }else{
      dialogConfig.data = {router: this.router, id};
    }
    let dialogRef = this.dialog.open(FormOfficesComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap : ParamMap) => {
    if(paramMap.has("recordId")){
      this.recordId = paramMap.get("recordId");
    }
    });

    this.service.getAllOffices();
    this.subscription = this.service.getOfficesUpdatedListener()
      .subscribe((data : Office[]) => {
        this.office = data;
        this.dataSource = new MatTableDataSource<Office>(this.office);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
