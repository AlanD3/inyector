import { ApplicationRef, ComponentRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ComponentEvent } from '../../classes/component-event/component-event';
import { InyectorParams } from '../../classes/inyector-params/inyector-params';

@Injectable()
export class ComponentController<T = any> {
  private componentRef: ComponentRef<any>;
  private eventEmitter: Subject<ComponentEvent>;
  private readonly listeners: any;

  constructor(
    private appRef: ApplicationRef,
    private params: InyectorParams
  ) {
    this.eventEmitter = new Subject<ComponentEvent>();
    this.eventEmitter.subscribe(($event) => {
      if (this.listeners[$event.event]) {
        this.listeners[$event.event]
          .forEach((callback) => callback($event));
      }
    });
    this.listeners = {};
  }

  getExtra(value: string, defaultValue?: any): any {
    return this.params.extras ? (
      this.params.extras[value] || defaultValue
    ) : (
      defaultValue
    );
  }

  getExtras(): { [parans: string]: any } {
    return this.params.extras;
  }

  getParent(): HTMLElement {
    return this.params.parent;
  }

  getInstance(): T {
    return this.componentRef.instance;
  }

  on(event, callback: ($event: ComponentEvent) => void): ComponentController<T> {
    if (!this.listeners[event])
      this.listeners[event] = [];
    this.listeners[event].push(callback);
    return this;
  }

  listen(event: string): Observable<ComponentEvent> {
    const subject = new Subject<ComponentEvent>();
    this.on(event, ($event) => subject.next($event));
    return subject;
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
