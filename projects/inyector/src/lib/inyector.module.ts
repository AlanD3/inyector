import { ModuleWithProviders, NgModule } from '@angular/core';
import { FloatingDockComponent } from './components/floating-dock/floating-dock.component';
import { Inyector } from './inyector.service';

@NgModule({
  declarations: [ FloatingDockComponent ]
})
export class InyectorModule {
  static forRoot(): ModuleWithProviders<InyectorModule> {
    return {
      ngModule: InyectorModule,
      providers: [ Inyector ]
    };
  }
}
