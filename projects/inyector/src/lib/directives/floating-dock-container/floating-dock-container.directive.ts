import { Directive, ElementRef, HostBinding } from '@angular/core';

declare type DIRECTION = 'vertical' | 'horizontal';

declare type POSITION = 'top' | 'left' | 'right' | 'bottom';

declare type ALIGN = 'start' | 'center' | 'end';

@Directive({
  selector: '[inyectorFloatingDockContainer]'
})
export class FloatingDockContainerDirective {
  @HostBinding('attr.align')
  align: ALIGN;

  @HostBinding('attr.direction')
  direction: DIRECTION;

  private _position: POSITION;
  private readonly _vertical = ['top', 'bottom'];

  constructor(
    public element: ElementRef<HTMLElement>
  ) { }

  set position(position: POSITION) {
    this._position = position;
    this.direction = this._vertical.includes(position) ? 'vertical' : 'horizontal';
  }

  @HostBinding('attr.position')
  get position() {
    return this._position;
  }
}
