import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { SideMenu } from './components/side-menu/side-menu';
@Component({
  selector: 'app-root',
  imports: [MapComponent, SideMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'safezone-frontend';
}
