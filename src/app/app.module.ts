import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// prime ng module, services and apis
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, DialogService, ConfirmationService } from 'primeng/api';

import { AuthGuard, JwtInterceptor } from './_helpers';
import { AuthService, PlatformConfigService, DataShareService, CommonLibService } from './_services';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { SearchObjPipe } from 'src/app/_pipes/search-obj.pipe';
import { SearchObjColDefPipe } from 'src/app/_pipes/search-obj-colDef.pipe';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/app/_pipes/shared.module';
import { ChatModule } from './modules/common/chat/chat.module';
import { ChartsModule } from './modules/common/charts/charts.module';
import { FilterContainerModule } from 'src/app/modules/common/filter-container/filter-container.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { helpComponent } from './components/login/help/help.component';
import { AppLayoutComponent } from './components/layouts/app-layout/app-layout.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarComponent } from './components/layouts//sidebar/sidebar.component';

import { ImageCropperModule } from 'ngx-image-cropper';

import { TermsConditionsComponent } from './components/login/terms-conditions/terms-conditions.component';

import {
  InputTextareaModule,
  InputSwitchModule,
  StepsModule,
  CalendarModule,
  ColorPickerModule
} from 'primeng/primeng';

import { ChatComponent } from './modules/common/chat/chat/chat.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { OrderListModule } from 'primeng/orderlist';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AngularDraggableModule } from 'angular2-draggable';
import { ListboxModule } from 'primeng/listbox';
import { CardsModule } from './modules/common/cards/cards.module';
import {TreeModule} from 'primeng/tree';
import { DataTableModule } from './modules/common/data-table/data-table.module';
import { MainLoginComponent } from './components/main-login/main-login.component';
import { NewCakeOrderComponent } from './modules/cake-order/new-cake-order/new-cake-order.component';
import { NewCustomerComponent } from './modules/customer/new-customer/new-customer.component';
import { NewFamilyComponent } from './modules/customer/new-customer/new-family/new-family.component';
import { NewProductComponent } from './modules/product/new-product/new-product.component';
import { UpdateStatusFormComponent } from './modules/cake-order/update-status/update-status-form.component';
import { NewSalesComponent } from './modules/sales/new-sales/new-sales.component';
import { NewSupplierComponent } from './modules/supplier/new-supplier/new-supplier.component';
import { NewPurchaseComponent } from './modules/purchase/new-purchase/new-purchase.component';
import { NewCategoryMasterComponent } from './modules/category-master/new-category-master/new-category-master.component';
import { NewMeasurementMasterComponent } from './modules/measurement-master/new-measurement-master/new-measurement-master.component';
import { NewCakeShapeMasterComponent } from './modules/cake-shape-master/new-cake-shape-master/new-cake-shape-master.component';
import { NewUserComponent } from './modules/user-master/new-user/new-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    AppLayoutComponent,
    FooterComponent,
    SidebarComponent,
    TermsConditionsComponent,
    helpComponent,
    MainLoginComponent,
    NewCakeOrderComponent,
    NewCustomerComponent,
    NewFamilyComponent,
    NewProductComponent,
    UpdateStatusFormComponent,
    NewSalesComponent,
    NewSupplierComponent,
    NewPurchaseComponent,
    NewCategoryMasterComponent,
    NewMeasurementMasterComponent,
    NewCakeShapeMasterComponent,
    NewUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FilterContainerModule,
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    MessageModule,
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    ProgressSpinnerModule,
    DynamicDialogModule,
    ToastModule,
    ImageCropperModule,
    ChipsModule,
    TabViewModule,
    ChartsModule,
    TableModule,
    TreeTableModule,
    AccordionModule,
    MultiSelectModule,
    SharedModule,
    DropdownModule,
    ConfirmDialogModule,
    RadioButtonModule,
    InputTextareaModule,
    InputSwitchModule,
    StepsModule,
    ChatModule,
    ScrollPanelModule,
    DataViewModule,
    PanelModule,
    OrderListModule,
    ToggleButtonModule,
    ListboxModule,
    AngularDraggableModule,
    ColorPickerModule,
    CardsModule,
    CalendarModule,
    TreeModule,
    DataTableModule,
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [
    AuthGuard,
    AuthService,
    DataShareService,
    PlatformConfigService,
    CommonLibService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    MessageService,
    DialogService,
    FormatNumPipe,
    SearchStringPipe,
    SearchObjPipe,
    ConfirmationService,
    SearchObjColDefPipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    ForgotPasswordComponent,
    TermsConditionsComponent,
    ChatComponent,
    helpComponent,
    MainLoginComponent,
    NewCakeOrderComponent,
    NewCustomerComponent,
    NewSupplierComponent,
    NewFamilyComponent,
    NewProductComponent,
    UpdateStatusFormComponent,
    NewSalesComponent,
    NewPurchaseComponent,
    NewCategoryMasterComponent,
    NewMeasurementMasterComponent,
    NewCakeShapeMasterComponent,
    NewUserComponent
  ]
})
export class AppModule { }
