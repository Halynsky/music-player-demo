import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: [
    '../../../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css',
    '../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    '../../../../node_modules/@fortawesome/fontawesome-free/css/v4-shims.min.css',
    '../../../../node_modules/primeicons/primeicons.css',
    '../../../../node_modules/primeng/resources/themes/nova-light/theme.css',
    '../../../../node_modules/primeng/resources/primeng.min.css',
    '../primeng.scss',
    './admin-layout.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
