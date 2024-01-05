import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstDoorComponent } from './first-door.component';

const routes: Routes = [{ path: '', component: FirstDoorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstDoorRoutingModule { }
