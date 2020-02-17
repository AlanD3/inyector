import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {ComponentController} from '../../services/component-controller/component-controller.service';

@Component({
  selector: 'inyector-floating-dock',
  templateUrl: './floating-dock.component.html',
  styleUrls: ['./floating-dock.component.scss']
})
export class FloatingDockComponent implements OnInit {
  @HostBinding('class.position-vertical')
  positionVertical: boolean;

  @HostBinding('class.position-horizontal')
  positionHorizontal: boolean;

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

  @ViewChild('container', { static: true })
  container: HTMLElement;

  isTop: boolean;
  isLeft: boolean;

  constructor(
    private _elementRef: ElementRef,
    private _controller: ComponentController
  ) {}

  ngOnInit() {
    const { target, position, margin, align } = this._controller.getExtras();
    const { top, left, right, bottom, width, height } = this._controller.getExtra('target').getBoundingClientRect();
    switch (position) {
      case 'top':
        this.top = top;
        this.left = left;
        this.width = width;
        this.isTop = true;
        this.positionVertical = true;
        break;
      case 'left':
        this.top = top;
        this.left = left;
        this.height = height;
        this.isLeft = true;
        this.positionHorizontal = true;
        break;
      case 'right':
        this.top = top;
        this.left = right;
        this.height = height;
        this.positionHorizontal = true;
        break;
      case 'bottom':
        this.top = bottom;
        this.left = left;
        this.width = width;
        this.positionVertical = true;
        break;
    }
  }
}
