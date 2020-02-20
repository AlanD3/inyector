import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

import { FloatingDockComponent } from './components/floating-dock/floating-dock.component';
import { ComponentController } from './services/component-controller/component-controller.service';
import { InjectorParams } from './classes/injector-params/injector-params';
import { InyectorParams } from './classes/inyector-params/inyector-params';

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

  add<T>(component: Type<T>, params: InyectorParams = {}): ComponentController<T> {
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
      .resolveComponentFactory(component)
      .create(injector);
    controller.setComponentRef(componentRef);

    this.appRef.attachView(componentRef.hostView);
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    (params.parent || params.dock?.getInstance().container.nativeElement || document.body).appendChild(domElement);

    return controller;
  }

  /**
   * @deprecated
   * user {@link add} instead
   *
   * will be removed in v1.0.0
   */
  append<T>(params: InjectorParams<T>): ComponentController<T> {
    return this.add<T>(params.component, params);
  }

  dock<T>(params: DockParams<T>): ComponentController<T> {
    const dockController = this.add(FloatingDockComponent, {
      extras: {
        target: params.target,
        position: params.position,
        margin: params.margin
      }
    });
    return this.add(params.component, {
      dock: dockController
    });
  }
}
