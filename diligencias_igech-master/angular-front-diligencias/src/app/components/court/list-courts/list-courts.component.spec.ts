import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourtsComponent } from './list-courts.component';

describe('ListCourtsComponent', () => {
  let component: ListCourtsComponent;
  let fixture: ComponentFixture<ListCourtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCourtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
