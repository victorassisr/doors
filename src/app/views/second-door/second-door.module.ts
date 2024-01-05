import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondDoorRoutingModule } from './second-door-routing.module';
import { SecondDoorComponent } from './second-door.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    SecondDoorComponent
  ],
  imports: [
    CommonModule,
    SecondDoorRoutingModule,
    SharedModule
  ]
})
export class SecondDoorModule { }
