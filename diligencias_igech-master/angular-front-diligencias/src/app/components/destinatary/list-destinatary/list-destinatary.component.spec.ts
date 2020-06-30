import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDestinataryComponent } from './list-destinatary.component';

describe('ListDestinataryComponent', () => {
  let component: ListDestinataryComponent;
  let fixture: ComponentFixture<ListDestinataryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDestinataryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDestinataryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
