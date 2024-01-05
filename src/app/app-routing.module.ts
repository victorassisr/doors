import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'first-door', loadChildren: () => import('./views/first-door/first-door.module').then(m => m.FirstDoorModule) },
  { path: 'second-door', loadChildren: () => import('./views/second-door/second-door.module').then(m => m.SecondDoorModule) },
  { path: 'third-door', loadChildren: () => import('./views/third-door/third-door.module').then(m => m.ThirdDoorModule) },
  { path: '', redirectTo: 'first-door', pathMatch: 'full' },
  { path: 'last-door', loadChildren: () => import('./views/last-door/last-door.module').then(m => m.LastDoorModule) },
  { path: '**', loadChildren: () => import('./views/first-door/first-door.module').then(m => m.FirstDoorModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
