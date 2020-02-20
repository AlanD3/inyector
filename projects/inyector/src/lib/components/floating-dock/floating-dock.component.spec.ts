import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingDockComponent } from './floating-dock.component';
import { ComponentController } from '../../services/component-controller/component-controller.service';

describe('FloatingDockComponent', () => {
  let component: FloatingDockComponent;
  let fixture: ComponentFixture<FloatingDockComponent>;
  let controller: jasmine.SpyObj<ComponentController>;
  let target: jasmine.SpyObj<HTMLElement>;

  beforeEach(async(() => {
    controller = jasmine.createSpyObj('ComponentController', ['getExtras']);
    target = jasmine.createSpyObj('HtmlElement', ['getBoundingClientRect']);
    TestBed.configureTestingModule({
      declarations: [ FloatingDockComponent ],
      providers: [
        {
          provide: ComponentController,
          useValue: controller
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingDockComponent);
    component = fixture.componentInstance;
  });

  it('should add class .position-vertical', () => {
    target.getBoundingClientRect.and.returnValue({} as any);
    controller.getExtras.and.returnValue({ target, position: 'top' });
    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveClass('position-vertical');
  });

  // TODO add the rest of tests
});
