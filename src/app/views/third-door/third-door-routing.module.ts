import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThirdDoorComponent } from './third-door.component';

const routes: Routes = [{ path: '', component: ThirdDoorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdDoorRoutingModule { }
