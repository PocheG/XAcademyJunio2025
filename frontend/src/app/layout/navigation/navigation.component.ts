import { Component } from '@angular/core';
import { LayoutModule } from "../layout.index";
import { NavigationItem } from './models/navigationsItems';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  navigationsItems:NavigationItem[]=[{
    label:"Jugadores",
    items:[{
      label:"Listado de jugadores",
      route:"players/"
    },{
      label:"Nuevo jugador",
      route:"/players/new-player"
    }]
  }]
  isMobile = false;

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 1024;
    }
  }
}
