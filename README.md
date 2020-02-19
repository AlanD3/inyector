[![npm version](https://img.shields.io/npm/v/inyector)](https://www.npmjs.com/package/inyector)
[![NPM Bundle Size](https://img.shields.io/bundlephobia/min/inyector)](https://bundlephobia.com/result?p=inyector@0.1.0)
[![Download](https://img.shields.io/npm/dw/inyector)](https://www.npmjs.com/package/inyector)

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
this.inyector.append({
    component: TestComponent
});
```

#### Inject component in an element

```ts
this.inyector.append({
    parent: htmlElement,
    component: TestComponent
});
```

#### Floating injection
Inject component in a floating docker and attach it to another element

```ts
this.inyector.dock({
    target: htmlElement,
    component: TestComponent,
    position: 'top',
});
```
