import { NgModule } from '@angular/core';
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from "../app-routing.module";


@NgModule({
  imports: [
    AppRoutingModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {

}
