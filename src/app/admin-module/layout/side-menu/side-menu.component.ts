import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'fas fa-users',
        routerLink: 'users',
        routerLinkActiveOptions: {exact: true}
      },
      {
        label: 'Tracks',
        icon: 'far fa-file-audio',
        routerLink: 'tracks'
      },
      {
        label: 'Genres',
        icon: 'fas fa-music',
        routerLink: 'genres'
      },

    ];
  }

}
