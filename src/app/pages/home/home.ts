import { Component } from '@angular/core';
import { Listocorrences } from '../../components/listocorrences/listocorrences';

@Component({
  selector: 'app-home',
  imports: [Listocorrences],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
