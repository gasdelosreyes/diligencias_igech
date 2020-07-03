import { Component, OnInit, ViewChild } from '@angular/core';
import { Court } from '../../../models/court';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CourtService } from '../../../services/court.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-courts',
  templateUrl: './list-courts.component.html',
  styleUrls: ['./list-courts.component.css']
})
export class ListCourtsComponent implements OnInit {
  public court : Court[] = [];
  public dataSource: MatTableDataSource<Court>;
  private subscription : Subscription;

  constructor(private service: CourtService) { }
  displayedColumns: String[] = ['name','description','address','action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.service.getAllCourts();
    this.subscription = this.service.getCourtUpdatedListener().subscribe((data: Court[]) => {
      this.court = data;
      this.dataSource = new MatTableDataSource<Court>(this.court);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCourt(court : Court){
    this.service.delteCourt(court.id);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
