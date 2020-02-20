import { TestBed } from '@angular/core/testing';

import { Inyector } from './inyector.service';

describe('InyectorService', () => {
  let service: Inyector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ Inyector ]
    });
    service = TestBed.inject(Inyector);
  });

  // TODO before 1.0.0 write tests
});
