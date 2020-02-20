import { Type } from '@angular/core';

import { InyectorParams } from '../inyector-params/inyector-params';

export class InjectorParams<T> extends InyectorParams {
  component: Type<T>;
}
