import { TestBed } from '@angular/core/testing';

import { InyectorService } from './inyector.service';

describe('InyectorService', () => {
  let service: InyectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InyectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
