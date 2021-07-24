import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterContainerModule } from '../../modules/common/filter-container/filter-container.module';
import { SalesReportRoutes } from '../sales/sales-report.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatNumPipe } from '../../_pipes/number-format.pipe';
import { SharedModule } from '../../_pipes/shared.module';
import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SalesReportComponent } from '../sales/sales-report.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/primeng';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [SalesReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FilterContainerModule,
    TreeTableModule,
    MultiSelectModule,
    InputSwitchModule,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    ConfirmDialogModule,
    FileUploadModule,
    CheckboxModule,
    RouterModule.forChild(SalesReportRoutes)
  ],
  providers: [FormatNumPipe, ConfirmationService]
})
export class SalesReportModule {}
