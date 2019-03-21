import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from "./admin-layout.component";
import { AdminHeaderComponent } from './header/admin-header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from "@angular/router";
import { PanelMenuModule } from "primeng/primeng";


@NgModule({
  imports: [
    RouterModule,
    PanelMenuModule
  ],
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent,
    SideMenuComponent
  ],
  exports: [
    AdminLayoutComponent
  ]
})
export class AdminLayoutModule {

}
