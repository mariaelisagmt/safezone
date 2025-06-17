import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  title = 'SafeZone identifica ameaças antes que virem problemas.';
  description =
    'Somos uma plataforma web que permite a qualquer pessoa se informar sobre áreas perigosas na cidade e cadastrar ocorrências de violência. Com mapas interativos e dados em tempo real, nosso propósito é ajudar a aumentar a segurança e a consciência comunitária.';
  rentButtonText = 'PESQUISAR';
  buyButtonText = 'REPORTAR';
}
