import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastDoorComponent } from './last-door.component';

const routes: Routes = [{ path: '', component: LastDoorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LastDoorRoutingModule { }
