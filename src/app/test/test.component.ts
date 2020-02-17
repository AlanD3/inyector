import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  static count = 0;
  ready: boolean;
  image: number;

  timeout: any;

  ngOnInit() {
    this.timeout = setInterval(() => this.update(), 3500);
    this.update();
  }

  ngOnDestroy() {
    clearInterval(this.timeout);
  }

  update() {
    this.ready = false;

    setTimeout(() => {
      TestComponent.count++;
      this.image = TestComponent.count % 4;
      this.ready = true;
    }, 1000);
  }
}
