import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { Home } from './pages/home/home';
import { SearchMap } from './pages/search-map/search-map';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'search', component: SearchMap },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
