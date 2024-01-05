import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThirdDoorRoutingModule } from './third-door-routing.module';
import { ThirdDoorComponent } from './third-door.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    ThirdDoorComponent
  ],
  imports: [
    CommonModule,
    ThirdDoorRoutingModule,
    SharedModule
  ]
})
export class ThirdDoorModule { }
