import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstDoorRoutingModule } from './first-door-routing.module';
import { FirstDoorComponent } from './first-door.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    FirstDoorComponent
  ],
  imports: [
    CommonModule,
    FirstDoorRoutingModule,
    SharedModule
  ]
})
export class FirstDoorModule { }
