import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotifyEvent } from './interfaces/notify-event.type';

@Injectable()
export class NotifyUtils {

  public emitter: Subject<NotifyEvent> = new Subject<NotifyEvent>();

  constructor() {

  }

  getChangeEmitter() {
    return this.emitter;
  }
}
