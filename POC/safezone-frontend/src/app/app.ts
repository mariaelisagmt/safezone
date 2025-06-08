import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-root',
  imports: [MapComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'safezone-frontend';
}
