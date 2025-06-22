import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer.components';
import { MatDialogModule } from '@angular/material/dialog';

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    RouterOutlet,
    Footer,
    RouterModule,
  ],
  templateUrl: './main.components.html',
  styleUrl: './main.components.scss',
})
export class MainComponent {
  menuAberto = false;

  user: User | null = {
    name: 'Maria Elisa',
    email: 'maria.elisa@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
  };

  logout() {
    // aqui você implementa a lógica de logout, por exemplo limpar token
    console.log('User logged out');
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu() {
    this.menuAberto = false;
  }
}
