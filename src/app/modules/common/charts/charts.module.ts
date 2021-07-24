import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { StepsModule } from 'primeng/steps';
import { SelectButtonModule } from 'primeng/selectbutton';

import { ChartsComponent } from './charts.component';
import { SharedModule } from 'src/app/_pipes/shared.module';

@NgModule({
  declarations: [ChartsComponent],
  imports: [CommonModule, ChartModule, StepsModule, SelectButtonModule, SharedModule],
  exports: [ChartsComponent]
})
export class ChartsModule { }
