import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfficesComponent } from './list-offices.component';

describe('ListOfficesComponent', () => {
  let component: ListOfficesComponent;
  let fixture: ComponentFixture<ListOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
