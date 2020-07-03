import { Component, OnInit, ViewChild } from '@angular/core';

// import { DestinataryService } from 'src/app/services/destinatary.service';
import { DestinataryService } from '../../../services/destinatary.service';
import { Destinatary } from '../../../models/destinatary';
import { Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-list-destinatary',
  templateUrl: './list-destinatary.component.html',
  styleUrls: ['./list-destinatary.component.css']
})

export class ListDestinataryComponent implements OnInit {
  public destinatary: Destinatary[] = [];
  public dataSource : MatTableDataSource<Destinatary>;
  private subscription : Subscription;

  constructor(public service : DestinataryService) {}
  displayedColumns: string[] = ['name', 'address', 'contact', 'cost','action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.service.getAllDestinatarys();
    this.subscription = this.service.getDestinataryUpdateListener()
    .subscribe((data: Destinatary[] ) => {
      this.destinatary = data;
      this.dataSource = new MatTableDataSource<Destinatary>(this.destinatary)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteDestinatary(destinatary: Destinatary){
    this.service.deleteDestinatary(destinatary.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
