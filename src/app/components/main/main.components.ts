import { Component, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer.components';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';

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
export class MainComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  user: IUser | null = null;
  menuAberto = false;

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu() {
    this.menuAberto = false;
  }
}
