import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from "./layout/admin-layout.component";
import { GenresComponent } from "./components/genres/genres.component";
import { TracksComponent } from "./components/tracks/tracks.component";
import { UsersComponent } from "./components/users/users.component";

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: 'tracks', },
      {path: 'users', component: UsersComponent},
      {path: 'tracks', component: TracksComponent},
      {path: 'genres', component: GenresComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
