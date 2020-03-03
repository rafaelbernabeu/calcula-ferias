import {TestBed} from '@angular/core/testing';

import {CalculaService} from './calcula.service';

describe('CalculaService', () => {
  let service: CalculaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
