import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutModule } from "./layout/admin-layout.module";
import { GenresComponent } from './components/genres/genres.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    GenresComponent,
    TracksComponent,
    UsersComponent
  ],
  imports: [
    AdminRoutingModule,
    AdminLayoutModule,
  ],
})
export class AdminModule { }
