[![npm version](https://img.shields.io/npm/v/inyector)](https://www.npmjs.com/package/inyector)
[![NPM Bundle Size](https://img.shields.io/bundlephobia/min/inyector)](https://bundlephobia.com/result?p=inyector@2.1.0)
[![Download](https://img.shields.io/npm/dt/inyector)](https://www.npmjs.com/package/inyector)

# Inyector

Angular service for component injection

### Installation
```bash
npm install inyector --save
```

### Demo

You can see the demo in https://inyector.netlify.com/

### Usage

#### Import

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InyectorModule } from 'inyector';

@NgModule({
    imports: [
        BrowserModule,
        InyectorModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Inject component in body

```ts
this.inyector.add(TestComponent);
```

#### Inject component in an element

```ts
this.inyector.add(TestComponent, {
    parent: htmlElement
});
```

#### Floating injection
Inject component in a floating docker and attach it to another element

```ts
this.inyector.dock(TestComponent, parentHtmlElement, {
    position: 'top'
});
```
