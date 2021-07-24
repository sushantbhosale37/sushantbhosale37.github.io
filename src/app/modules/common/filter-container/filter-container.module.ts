import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterContainerComponent } from './filter-container.component';
import { DimFilterComponent } from '../filter-container/dim-filter/dim-filter.component';
import { GroupByComponent } from '../filter-container/group-by/group-by.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SpinnerModule } from 'primeng/spinner';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DaterangePickerComponent } from './daterange-picker/daterange-picker.component';
import { CalendarModule } from 'primeng/calendar';
import { MetricFilterComponent } from './metric-filter/metric-filter.component';
import { SharedModule } from 'src/app/_pipes/shared.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    FilterContainerComponent,
    DimFilterComponent,
    GroupByComponent,
    DaterangePickerComponent,
    MetricFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DialogModule,
    CheckboxModule,
    DropdownModule,
    SpinnerModule,
    PanelModule,
    ButtonModule,
    SelectButtonModule,
    CalendarModule,
    SharedModule,
    ProgressSpinnerModule
  ],
  exports: [
    FilterContainerComponent,
    DimFilterComponent,
    GroupByComponent,
    DaterangePickerComponent
  ]
})
export class FilterContainerModule {}
