import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/usuarios', title: 'Usuarios',  icon:'pe-7s-user', class: '' },
    { path: '/table', title: 'Table',  icon:'pe-7s-note2', class: '' },
    { path: '/expedientes', title: 'Expedientes',  icon:'pe-7s-bell', class: '' },
    { path: '/destinos', title: 'Destinos',  icon:'pe-7s-news-paper', class: '' },
    { path: '/juzgados', title: 'Juzgados',  icon:'pe-7s-science', class: '' },    
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
