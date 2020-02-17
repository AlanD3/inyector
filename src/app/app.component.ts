import { Component } from '@angular/core';
import { Inyector } from '../../projects/inyector/src/lib/inyector.service';
import {TestComponent} from './test/test.component';
import {ComponentController} from '../../projects/inyector/src/lib/services/component-controller/component-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  controller: ComponentController<TestComponent>;

  constructor(
    private _inyector: Inyector
  ) {
  }

  injectOnBody() {
    this.reset();
    this.controller = this._inyector.append({
      component: TestComponent
    });
  }

  injectOnElement(parent: HTMLElement) {
    this.reset();
    this.controller = this._inyector.append({
      parent,
      component: TestComponent
    });
  }

  injectFloatingComponent(dock: HTMLElement) {
    this.reset();
    this.controller = this._inyector.dock({
      target: dock,
      component: TestComponent,
      position: dock.getAttribute('data-position') as any,
      margin: 15
    });
  }

  reset() {
    if (this.controller)
      this.controller.destroy();
  }
}
