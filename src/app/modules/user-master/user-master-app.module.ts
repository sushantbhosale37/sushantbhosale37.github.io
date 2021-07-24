import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterContainerModule } from '../common/filter-container/filter-container.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatNumPipe } from '../../_pipes/number-format.pipe';
import { SharedModule } from '../../_pipes/shared.module';
import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserMasterAppComponent } from './user-master-app.component';
import { UserMasterAppRoutes } from './user-master-app.routing';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  declarations: [UserMasterAppComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FilterContainerModule,
    TreeTableModule,
    MultiSelectModule,
    InputSwitchModule,
    ButtonModule,
    ConfirmDialogModule,
    FileUploadModule,
    RouterModule.forChild(UserMasterAppRoutes)
  ],
  providers: [FormatNumPipe, ConfirmationService]
})
export class UserMasterAppModule {}
