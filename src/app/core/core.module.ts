import { NgModule, SkipSelf, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    SharedModule,
    AppRoutingModule,
  ]
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() core: CoreModule) {
    if (core) {
      throw new Error(`${CoreModule.name} has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
