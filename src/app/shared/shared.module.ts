import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GraphQLModule } from './graphql/graphql.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    GraphQLModule,
    ComponentsModule,
    SimpleNotificationsModule.forRoot({
      position: ['top', 'right'],
      timeOut:5000,
      lastOnBottom: true,
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    GraphQLModule,
    ComponentsModule,
    SimpleNotificationsModule
  ],
})
export class SharedModule { }
