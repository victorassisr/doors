import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const components = [MatDialogModule, MatButtonModule, MatIconModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    components
  ],
  exports: [components]
})
export class SharedModule { }
