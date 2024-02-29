import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatGridListModule, MatDividerModule],
  exports: [CommonModule, MatGridListModule, MatDividerModule],
})
export class NgMaterialModule {}
