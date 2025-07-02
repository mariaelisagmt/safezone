import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { Home } from './pages/home/home';
import { SearchMap } from './pages/search-map/search-map';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './pages/login/login';
import { RegisterUserComponent } from './pages/register-user/register-user';
import { SettingsComponent } from './pages/settings/settings';
import { ListOcorrences } from './components/listOcurrences/listOcorrences';
import { AuthGuard } from './guards/auth-guard';
import { MainComponent } from './components/main/main.components';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: Home },
      { path: 'search', component: SearchMap },
      { path: 'add', component: MapComponent },
      { path: 'list', component: ListOcorrences },
      { path: 'config', component: SettingsComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: '/home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
