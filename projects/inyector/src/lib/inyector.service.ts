import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import { InjectorParams } from './classes/injector-params/injector-params';
import { ComponentController } from './services/component-controller/component-controller.service';
import {FloatingDockComponent} from './components/floating-dock/floating-dock.component';

class DockParams<T> {
  target: HTMLElement;
  component: Type<T>;
  position: 'top' | 'left' | 'right' | 'bottom';
  margin?: number;
  align?: 'top' | 'left' | 'right' | 'bottom';
}

@Injectable()
export class Inyector {

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  append<T>(params: InjectorParams<T>): ComponentController<T> {
    const controller = new ComponentController<T>(this.appRef, params);
    const injector = Injector.create({
      providers: [
        {
          provide: ComponentController,
          useValue: controller
        }
      ]
    });

    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(params.component)
      .create(injector);
    controller.setComponentRef(componentRef);

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    (params.parent || params.dock?.getInstance().container.nativeElement || document.body).appendChild(domElem);

    return controller;
  }

  dock<T>(params: DockParams<T>): ComponentController<T> {
    const dockController = this.append({ component: FloatingDockComponent, extras: {
      target: params.target,
      position: params.position,
      margin: params.margin
    }});
    return this.append({
      component: params.component,
      dock: dockController
    });
  }
}
