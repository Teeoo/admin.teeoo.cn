import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NotifyModule } from './notify/notify.module';

const component = [
  ErrorComponent
]

@NgModule({
  declarations: [...component],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    NotifyModule.forRoot({
      options: {
        offset: [10, 20]
      },
      notify: {
        progress: true,
        timeout: 5000,
      }
    })
  ],
  exports: [
    ...component,
    NotifyModule
  ]
})
export class ComponentsModule { }
