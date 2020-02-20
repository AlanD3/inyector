import { TestBed } from '@angular/core/testing';

import { ComponentController } from './component-controller.service';
import { InyectorParams } from '../../classes/inyector-params/inyector-params';

describe('ComponentControllerService', () => {
  let params: InyectorParams;
  let controller: ComponentController;

  beforeEach(() => {
    params = {};
    TestBed.configureTestingModule({
      providers: [
        ComponentController,
        {
          provide: InyectorParams,
          useValue: params
        }
      ]
    });
    controller = TestBed.inject(ComponentController);
  });

  it('#getExtra() should return value from extras', () => {
    params.extras = { value: 'Yeah!' };
    expect(controller.getExtra('value', 'bad')).toBe('Yeah!');
  });

  it('#getExtra() should return default value if there is not extras', () => {
    expect(controller.getExtra('value', 'Yeah!')).toBe('Yeah!');
  });

  it('#getExtra() should return default value if the key doesn\'t exists', () => {
    params.extras = { value: 'Yeah!' };
    expect(controller.getExtra('other', 'thing')).toBe('thing');
  });

  it('#getExtras() should return extras map', () => {
    params.extras = { value1: 'val1', value2: 'val2' };
    expect(controller.getExtras()).toEqual({ value1: 'val1', value2: 'val2' });
  });
});
