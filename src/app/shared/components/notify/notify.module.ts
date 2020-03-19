import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from './notify.component';
import { NotifyHolderComponent } from './notify-holder.component';
import { NotifyService } from './notify.service';
import { NotifyPushService } from './push.service';
import { NotifyServiceConfig } from './notify.service.config';
import { NotifyUtils } from './notify.utils';



@NgModule({
  declarations: [NotifyHolderComponent, NotifyComponent],
  imports: [
    CommonModule
  ],
  providers: [NotifyService, NotifyPushService, NotifyUtils],
  entryComponents: [NotifyHolderComponent, NotifyComponent],
})
export class NotifyModule {
  static forRoot(config?: NotifyServiceConfig): ModuleWithProviders {
    return {
      ngModule: NotifyModule,
      providers: [{ provide: NotifyServiceConfig, useValue: config }],
    };
  }
}
