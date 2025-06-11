import { Component } from '@angular/core';
import { MainComponent } from './components/main/main.components';
@Component({
  selector: 'app-root',
  imports: [MainComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'safezone-frontend';
}
