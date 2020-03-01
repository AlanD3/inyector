import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[inyectorFloatingDockContainer]'
})
export class FloatingDockContainerDirective {
  @HostBinding('attr.position')
  position: string;

  constructor(
    public element: ElementRef<HTMLElement>
  ) { }
}
