import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOfficesComponent } from './form-offices.component';

describe('FormOfficesComponent', () => {
  let component: FormOfficesComponent;
  let fixture: ComponentFixture<FormOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
