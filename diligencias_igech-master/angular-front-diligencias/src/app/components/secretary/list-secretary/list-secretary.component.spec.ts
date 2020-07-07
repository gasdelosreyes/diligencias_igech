import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSecretaryComponent } from './list-secretary.component';

describe('ListSecretaryComponent', () => {
  let component: ListSecretaryComponent;
  let fixture: ComponentFixture<ListSecretaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSecretaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
