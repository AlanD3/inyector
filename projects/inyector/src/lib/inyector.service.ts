import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

import { FloatingDockComponent } from './components/floating-dock/floating-dock.component';
import { ComponentController } from './services/component-controller/component-controller.service';
import { InjectorParams } from './classes/injector-params/injector-params';
import { InyectorParams } from './classes/inyector-params/inyector-params';
import { DockParams } from './classes/dock-params/dock-params';

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
    (params.parent || params.dock?.getInstance().element || document.body).appendChild(domElement);

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

  dock<T>(component: Type<T>, target: HTMLElement, params: DockParams): ComponentController<T> {
    const { extras, margin, position = 'bottom', align = 'center' } = params;
    const dockController = this.add(FloatingDockComponent, {
      extras: { align, target, margin, position }
    });
    return this.add(component, {
      extras,
      dock: dockController
    });
  }
}
