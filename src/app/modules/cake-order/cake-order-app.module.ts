import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterContainerModule } from '../common/filter-container/filter-container.module';
import { CakeOrderAppRoutes } from './cake-order-app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatNumPipe } from '../../_pipes/number-format.pipe';
import { SharedModule } from '../../_pipes/shared.module';
import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CakeOrderAppComponent } from './cake-order-app.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [CakeOrderAppComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FilterContainerModule,
    TreeTableModule,
    MultiSelectModule,
    InputSwitchModule,
    ButtonModule,
    // CalendarModule,
    ConfirmDialogModule,
    FileUploadModule,
    RouterModule.forChild(CakeOrderAppRoutes)
  ],
  providers: [FormatNumPipe, ConfirmationService]
})
export class CakeOrderAppModule {}
