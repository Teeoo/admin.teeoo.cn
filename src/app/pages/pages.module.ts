import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ NotFoundComponent ],
  imports: [
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
