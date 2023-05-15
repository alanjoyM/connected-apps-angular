import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { ResponsiveGridDirective } from '../responsive-grid.directive';



@NgModule({
  imports: [
    CommonModule,
    MatGridListModule
  ],
  declarations: [
    ResponsiveGridDirective
  ],
  exports: [
    ResponsiveGridDirective
  ]
})
export class ResponsiveGridModule { }
