import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LastDoorRoutingModule } from './last-door-routing.module';
import { LastDoorComponent } from './last-door.component';


@NgModule({
  declarations: [
    LastDoorComponent
  ],
  imports: [
    CommonModule,
    LastDoorRoutingModule
  ]
})
export class LastDoorModule { }
