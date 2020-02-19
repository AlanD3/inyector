import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InyectorModule } from 'inyector';

import { TestComponent } from './test/test.component';
import { AppComponent } from './app.component';

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
