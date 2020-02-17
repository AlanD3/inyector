import { TestBed } from '@angular/core/testing';

import { ComponentController } from './component-controller.service';

describe('ComponentControllerService', () => {
  let service: ComponentController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
