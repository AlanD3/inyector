import { ApplicationRef, ComponentRef, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ComponentEvent } from '../../classes/component-event/component-event';
import { InyectorParams } from '../../classes/inyector-params/inyector-params';

@Injectable()
export class ComponentController<T = any> {
  private componentRef: ComponentRef<any>;
  private eventEmitter: Subject<ComponentEvent>;

  constructor(
    private appRef: ApplicationRef,
    private params: InyectorParams
  ) {
    this.eventEmitter = new Subject<ComponentEvent>();
  }

  getExtra(value: string, defaultValue?: any): any {
    return this.params.extras?.[value] ?? defaultValue;
  }

  getExtras(): Params {
    return this.params.extras;
  }

  getParent(): HTMLElement {
    return this.params.parent;
  }

  getInstance(): T {
    return this.componentRef.instance;
  }

  on(event, callback: ($event: ComponentEvent) => void): ComponentController<T> {
    this.listen(event)
      .subscribe(callback);
    return this;
  }

  listen(event: string): Observable<ComponentEvent> {
    return this.eventEmitter
      .pipe(filter(({ event: _event }) => (
        _event === event
      )));
  }

  setComponentRef(componentRef: ComponentRef<any>) {
    this.componentRef = componentRef;
  }

  emitEvent(event: ComponentEvent) {
    this.eventEmitter.next(event);
  }

  listenEvents(): Observable<ComponentEvent> {
    return this.eventEmitter.asObservable();
  }

  complete() {
    this.emitEvent({ event: 'completed' });
    this.eventEmitter.complete();
  }

  close() {
    this.appRef.detachView(this.componentRef.hostView);
  }

  destroy(event?: ComponentEvent) {
    if (event)
      this.eventEmitter.next(event);
    if (this.params.dock)
      return this.params.dock.close();
    this.appRef.detachView(this.componentRef.hostView);
    this.complete();
  }
}
