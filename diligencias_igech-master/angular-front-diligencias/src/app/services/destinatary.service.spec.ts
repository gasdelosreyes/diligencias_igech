import { TestBed } from '@angular/core/testing';

import { DestinataryService } from './destinatary.service';

describe('DestinataryService', () => {
  let service: DestinataryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinataryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
