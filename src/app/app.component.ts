import { Component } from '@angular/core';
import { Inyector, ComponentController } from 'inyector';

import { TestComponent } from './test/test.component';

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
    this.controller = this._inyector.add(TestComponent);
  }

  injectOnElement(parent: HTMLElement) {
    this.reset();
    this.controller = this._inyector.add(TestComponent, { parent });
  }

  injectFloatingComponent(dock: HTMLElement) {
    this.reset();
    this.controller = this._inyector.dock(TestComponent, dock, {
      position: dock.getAttribute('data-position') as any,
      margin: 15,
      extras: {
        shadow: true
      }
    });
  }

  reset() {
    if (this.controller)
      this.controller.destroy();
  }
}
