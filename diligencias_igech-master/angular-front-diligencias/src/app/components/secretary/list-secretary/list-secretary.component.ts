import { Component, OnInit, ViewChild } from '@angular/core';
import { Secretary } from '../../../models/secretary';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource } from '@angular/material/table';
import { SecretaryService } from '../../../services/secretary.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormSecretaryComponent } from '../form-secretary/form-secretary.component';

@Component({
  selector: 'app-list-secretary',
  templateUrl: './list-secretary.component.html',
  styleUrls: ['./list-secretary.component.css']
})
export class ListSecretaryComponent implements OnInit {
  private courtId: String
  public secretary: Secretary[] = [];
  public dataSource: MatTableDataSource<Secretary>;
  private subscription : Subscription;

  constructor(private service : SecretaryService, public router : ActivatedRoute, private dialog: MatDialog) { }
  displayedColumns: String[] = ['number','description','action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  openDialog(id : String){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if(id === undefined){
      dialogConfig.data = { route: this.router}
    }else{
      dialogConfig.data = { route: this.router, id}
    }
    this.dialog.open(FormSecretaryComponent,dialogConfig);
    let dialogRef = this.dialog.open(FormSecretaryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap : ParamMap) => {
      if(paramMap.has("courtId")){
        this.courtId = paramMap.get("courtId");
        this.service.getAllSecretarys(this.courtId);
        this.subscription = this.service.getSecretaryUpdatedListener()
        .subscribe((data: Secretary[]) => {
          this.secretary = data;
          this.dataSource = new MatTableDataSource<Secretary>(this.secretary);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSecretary(secretary : Secretary){
    this.service.deleteSecretary(secretary.id);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
