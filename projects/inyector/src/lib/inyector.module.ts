import { ModuleWithProviders, NgModule } from '@angular/core';
import { FloatingDockComponent } from './components/floating-dock/floating-dock.component';
import { FloatingDockContainerDirective } from './directives/floating-dock-container/floating-dock-container.directive';
import { Inyector } from './inyector.service';

@NgModule({
  declarations: [ FloatingDockComponent, FloatingDockContainerDirective ]
})
export class InyectorModule {
  static forRoot(): ModuleWithProviders<InyectorModule> {
    return {
      ngModule: InyectorModule,
      providers: [ Inyector ]
    };
  }
}
