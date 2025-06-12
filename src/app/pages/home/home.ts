import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  title = 'SafeZone identificando ameaças antes que virem problemas.';
  description = 'Somos uma plataforma web que permite a qualquer pessoa se informar sobre áreas perigosas na cidade e cadastrar ocorrências de violência. Com mapas interativos e dados em tempo real, ajuda a aumentar a segurança e a consciência comunitária.';
  rentButtonText = 'PESQUISAR';
  buyButtonText = 'REPORTAR';

  onSearchClick() {
    console.log('Pesquisar endereços seguros');
  }

  onReportClick() {
    console.log('Reportar ocorrencia');
  }
}
