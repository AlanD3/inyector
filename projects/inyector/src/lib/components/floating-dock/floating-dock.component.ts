import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';

import { FloatingDockContainerDirective } from '../../directives/floating-dock-container/floating-dock-container.directive';
import { ComponentController } from '../../services/component-controller/component-controller.service';

@Component({
  selector: 'inyector-floating-dock',
  templateUrl: './floating-dock.component.html',
  styleUrls: ['./floating-dock.component.scss']
})
export class FloatingDockComponent implements OnInit {
  @HostBinding('style.top.px')
  top: number;

  @HostBinding('style.left.px')
  left: number;

  @HostBinding('style.right.px')
  right: number;

  @HostBinding('style.bottom.px')
  bottom: number;

  @HostBinding('style.width.px')
  width: number;

  @HostBinding('style.height.px')
  height: number;

  @HostBinding('style.marginTop.px')
  marginTop: number;

  @HostBinding('style.marginLeft.px')
  marginLeft: number;

  @ViewChild(FloatingDockContainerDirective, { static: true })
  container: FloatingDockContainerDirective;

  private readonly _vertical = ['top', 'bottom'];

  constructor(
    private _elementRef: ElementRef,
    private _controller: ComponentController
  ) {}

  ngOnInit() {
    const { target, position, align, margin = 0 } = this._controller.getExtras();
    const { top, left, right, bottom, width, height } = target.getBoundingClientRect();
    this.container.position = position;
    this.container.align = align;
    if (this._vertical.includes(position)) {
      this.left = left;
      this.width = width;
      const isTop = position === 'top';
      this.top = isTop ? (top - margin) : bottom;
      if (!isTop)
        this.marginTop = margin;
    } else {
      this.top = top;
      this.height = height;
      const isLeft = position === 'left';
      this.left = isLeft ? (left - margin) : right;
      if (!isLeft)
        this.marginLeft = margin;
    }
  }

  get element() {
    return this.container.element.nativeElement;
  }
}
