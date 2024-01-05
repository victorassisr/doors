import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondDoorComponent } from './second-door.component';

const routes: Routes = [{ path: '', component: SecondDoorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondDoorRoutingModule { }
