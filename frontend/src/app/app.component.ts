import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from "./layout/layout.index";
import { NavigationItem } from './layout/navigation/models/navigationsItems';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

 
}
