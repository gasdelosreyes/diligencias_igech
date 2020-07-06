import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSecretaryComponent } from './form-secretary.component';

describe('FormSecretaryComponent', () => {
  let component: FormSecretaryComponent;
  let fixture: ComponentFixture<FormSecretaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSecretaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
