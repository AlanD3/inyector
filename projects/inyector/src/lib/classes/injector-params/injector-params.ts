import { Type } from '@angular/core';

export class InjectorParams<T> {
  component: Type<T>;
  parent?: HTMLElement;
  dock?: any;
  extras?: {
    [s: string]: any
  };
}
