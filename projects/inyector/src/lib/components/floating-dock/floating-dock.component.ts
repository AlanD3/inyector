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

  private readonly _vertical = ['top', 'bottom'];

  constructor(
    private _elementRef: ElementRef,
    private _controller: ComponentController
  ) {}

  ngOnInit() {
    const { position, margin, align } = this._controller.getExtras();
    const { top, left, right, bottom, width, height } = this._controller.getExtra('target').getBoundingClientRect();
    if (this._vertical.includes(position)) {
      this.left = left;
      this.width = width;
      this.positionVertical = true;
      this.isTop = position === 'top';
      this.top = this.isTop ? top : bottom;
    } else {
      this.top = top;
      this.height = height;
      this.positionHorizontal = true;
      this.isLeft = position === 'left';
      this.left = this.isLeft ? left : right;
    }
  }
}
