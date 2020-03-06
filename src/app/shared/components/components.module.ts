import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const component=[
  ErrorComponent
]

@NgModule({
  declarations: [...component],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports:[
    ...component
  ]
})
export class ComponentsModule { }
