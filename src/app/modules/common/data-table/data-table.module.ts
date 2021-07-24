import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTableModule } from 'primeng/treetable';
import { DataTableComponent } from './data-table.component';
import { SharedModule } from '../../../_pipes/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [DataTableComponent],
  imports: [CommonModule, SharedModule, TreeTableModule, MultiSelectModule,FormsModule],
  exports: [DataTableComponent]
})
export class DataTableModule { }
