import { Component, OnInit, OnDestroy, Input, NgZone } from '@angular/core';
import { Notify } from './interfaces/notify.type';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NotifyService } from './notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  preserveWhitespaces: false
})
export class NotifyComponent implements OnInit, OnDestroy {

  constructor(private sanitizer: DomSanitizer, private zone: NgZone, private notifyService: NotifyService) { }

  @Input() item: Notify;
  html: SafeHtml;
  animate: string;
  classes: any = {};

  private stopTime = false;
  private timer: any;
  private steps: number;
  private speed: number;
  private start: any;
  private count = 0;
  private diff: any;

  progressWidth = 0;

  ngOnInit(): void {

    switch (this.item.theme) {
      case 'bootstrap':
        switch (this.item.type) {
          case 'alert':
            this.item.bstype = 'warning';
            break;
          case 'error':
            this.item.bstype = 'danger';
            break;
          default:
            this.item.bstype = this.item.type;
            break;
        }
        break;
    }

    this.html = this.sanitizer.bypassSecurityTrustHtml(this.item.html.replace(/\{([a-z]+)\}/g, (full, key) => {
      return this.item[key] || '';
    }));

    this.classes['notify-theme-' + this.item.theme] = true;
    this.classes['notify-' + this.item.type] = true;

    if (this.item.rtl === true)
      this.classes['notify-rtl'] = true;

    if (this.item.animate_in) {
      // tslint:disable-next-line: no-string-literal
      this.classes['animated'] = true;
      this.classes[this.item.animate_in] = true;
    }

    if (this.item.className) {
      this.classes[this.item.className] = true;
    }

    if (this.item.timeout > 0)
      this.startTimeout();
  }
  private startTimeout() {
    this.steps = this.item.timeout / 10;
    this.speed = this.item.timeout / this.steps;
    this.start = new Date().getTime();
    this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.speed));
  }
  private instance = () => {
    this.zone.runOutsideAngular(() => {
      this.zone.run(() => this.diff = (new Date().getTime() - this.start) - (this.count * this.speed));

      if (this.count++ >= this.steps) {
        this.zone.run(() => {
          this.remove();
        });
      } else if (!this.stopTime) {
        if (this.item.progress)
          this.zone.run(() => this.progressWidth += 100 / this.steps);

        this.timer = setTimeout(this.instance, (this.speed - this.diff));
      }
    });
  }

  onEnter(): void {
    if (this.item.pauseOnHover) {
      this.stopTime = true;
    }
  }

  onLeave(): void {
    if (this.item.pauseOnHover) {
      this.stopTime = false;
      setTimeout(this.instance, (this.speed - this.diff));
    }
  }

  onClick($e: MouseEvent): void {
    // tslint:disable-next-line: no-non-null-assertion
    this.item.click!.emit($e);

    if (this.item.clickToClose) {
      this.remove();
    }
  }

  private remove() {
    if (this.item.animate_out) {
      this.classes[this.item.animate_in] = false;
      this.classes[this.item.animate_out] = true;
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => this.notifyService.set(this.item, false));
        }, 500);
      });
    } else {
      this.notifyService.set(this.item, false);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

}
