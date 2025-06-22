import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { Home } from './pages/home/home';
import { SearchMap } from './pages/search-map/search-map';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './pages/login/login';
import { RegisterUserComponent } from './pages/register-user/register-user';
import { SettingsComponent } from './pages/settings/settings';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'search', component: SearchMap },
  { path: 'add', component: MapComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'config', component: SettingsComponent },
  { path: 'logout', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
