import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EventEmitter, EmbeddedViewRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NotifyEvent } from './interfaces/notify-event.type';
import { Icons, defaultIcons } from './interfaces/icons';
import { NotifyHolderComponent } from './notify-holder.component';
import { NotifyServiceConfig } from './notify.service.config';
import { Notify } from './interfaces/notify.type';
import { HolderOptions } from './interfaces/holder.options';
import { Options } from 'graphql/utilities/buildClientSchema';
import { NotifyUtils } from './notify.utils';

@Injectable()
export class NotifyService {
  // private emitter: Subject<NotifyEvent> = new Subject<NotifyEvent>();
  private icons: Icons = defaultIcons;

  private notifyHolderComponent: NotifyHolderComponent;

  private container: HTMLElement;

  constructor(
    private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    @Optional() private config: NotifyServiceConfig,
    private _notifyUtils: NotifyUtils
  ) {
    if (config) {
      this.container = config.container;
    }
  }

  set(notify: Notify, to: boolean = true) {
    if (!this.notifyHolderComponent) {
      this.notifyHolderComponent = this.createNotifyHolder();
      this.updateSetting({});
    }

    if (to) {
      notify = Object.assign({}, this.config.notify, notify);
      notify.id = notify.id
        ? notify.id
        : Math.random()
          .toString(36)
          .substring(3);
      notify.click = new EventEmitter<{}>();
    }

    this._notifyUtils.emitter.next({ command: 'set', notify, add: to });
    return notify;
  }

  updateSetting(options: HolderOptions) {
    this._notifyUtils.emitter.next({
      command: 'options',
      holderOptions: Object.assign({}, this.config.options, options),
    });
  }

  private createNotifyHolder(): NotifyHolderComponent {
    // tslint:disable-next-line: one-variable-per-declaration
    const factory = this.resolver.resolveComponentFactory(
      NotifyHolderComponent,
    ),
      ref = factory.create(this.injector),
      rootNode = (ref.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

    if (!this.container) {
      this.container = document.body;
    }

    this.applicationRef.attachView(ref.hostView);
    ref.onDestroy(() => {
      this.applicationRef.detachView(ref.hostView);
    });

    this.container.appendChild(rootNode);
    return ref.instance;
  }

  getChangeEmitter() {
    return this._notifyUtils.emitter;
  }

  success(title: string, content?: string, override?: Options) {
    return this.set(
      Object.assign({}, override, {
        title,
        content: content || '',
        type: 'success',
        icon: this.icons.success,
      }),
    );
  }

  error(title: string, content?: string, override?: Options) {
    return this.set(
      Object.assign({}, override, {
        title,
        content: content || '',
        type: 'error',
        icon: this.icons.error,
      }),
    );
  }

  alert(title: string, content?: string, override?: Options) {
    return this.set(
      Object.assign({}, override, {
        title,
        content: content || '',
        type: 'alert',
        icon: this.icons.alert,
      }),
    );
  }

  info(title: string, content?: string, override?: Options) {
    return this.set(
      Object.assign({}, override, {
        title,
        content: content || '',
        type: 'info',
        icon: this.icons.info,
      }),
    );
  }

  bare(title: string, content: string, type: string, override?: Options) {
    return this.set(
      Object.assign({}, override, {
        title,
        content: content || '',
        type,
      }),
    );
  }

  html(
    title: string,
    content: string,
    html: string,
    type?: string,
    override?: Options,
  ) {
    return this.set(
      Object.assign({}, override, {
        title,
        content: content || '',
        html,
        type,
      }),
    );
  }

  remove(id: string) {
    this._notifyUtils.emitter.next({ command: 'remove', id });
  }

  clear() {
    this._notifyUtils.emitter.next({ command: 'clear' });
  }
}
