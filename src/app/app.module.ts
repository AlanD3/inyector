import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {InyectorModule} from '../../projects/inyector/src/lib/inyector.module';
import { TestComponent } from './test/test.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InyectorModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
