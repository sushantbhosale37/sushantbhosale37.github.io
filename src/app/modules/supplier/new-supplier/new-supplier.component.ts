import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FetchApiDataService } from '../../supplier/fetch-api-data.service';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/primeng';

@Component({
  selector: 'ym-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.scss'],
  providers: [DialogService]
})
export class NewSupplierComponent implements OnInit {
  formNewRowModel: FormGroup;
  isEdit = false;
  editTableData: Object;
  supplierCode: string;
  supplierName: string;
  supRemaingBalanceDate: Date;
  supMobile: string;
  supAddress: string;
  supPhone: string;
  supGstPAN: string;
  supEMail: string;
  supRemainingBalance: string;
  yearRange: string;
  maxDate = new Date();
  selectedSuppStatus: object;
  SuppStatusOptions:any[];

  constructor(
    private fb: FormBuilder,
    private dataFetchServ: FetchApiDataService,
    private toastService: ToastService,
    private dynamicDialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) { 
    this.isEdit = this.config.data['isEdit'];
    if (this.isEdit) { this.editTableData = this.config.data['data']; }
  }

  ngOnInit() {
    this.yearRange = moment().subtract(100, 'year').format('YYYY') + ':' + moment().format('YYYY');

    this.formNewRowModel = this.fb.group({
      supplierCode: new FormControl('', Validators.required),
      supplierName: new FormControl('', Validators.required),
      supMobile: new FormControl('', Validators.required),
      supPhone: new FormControl(),
      supAddress: new FormControl('', Validators.required),
      supGstPAN: new FormControl('', Validators.required),
      supEMail: new FormControl(),
      supRemainingBalance: new FormControl('', Validators.required),
      supRemaingBalanceDate: new FormControl(),
      selectedSuppStatus: new FormControl('', Validators.required)
    });
    this.getFilters();
    if (this.isEdit) {
      this.supplierCode = this.editTableData['supplierCode'];
      this.supplierName = this.editTableData['supplierName'];      
      this.supMobile = this.editTableData['supMobile'];
      this.supPhone = this.editTableData['supPhone'];
      this.supAddress = this.editTableData['supAddress'];
      this.supGstPAN = this.editTableData['supGstPAN'];
      this.supEMail = this.editTableData['supEMail'];
      this.supRemainingBalance = this.editTableData['supRemainingBalance'];
      this.supRemaingBalanceDate = this.editTableData['supRemaingBalanceDate'] == '' ? null : moment(this.editTableData['supRemaingBalanceDate'], 'DD/MM/YYYY').toDate();
      this.selectedSuppStatus = {
        label: this.editTableData['isActive'],
        key: this.editTableData['isActive']
      }
    } 
  }

  get f() {
    return this.formNewRowModel.controls;
  }

  getFilters() {    
    let SuppStatus = [];     
    SuppStatus.push({ label: 'Active', key: 'Active' });
    SuppStatus.push({ label: 'InActive', key: 'InActive' });     
    this.SuppStatusOptions = SuppStatus;      
}

  submitHandler() {
    const newOderObj = {
      supID: '0',
      supplierCode: this.supplierCode,
      supplierName: this.supplierName,
      supMobile: this.supMobile,
      supPhone:this.supPhone,
      supAddress: this.supAddress,
      supGstPAN: this.supGstPAN,
      supEMail: this.supEMail,
      supRemainingBalance: this.supRemainingBalance,
      supRemaingBalanceDate: this.supRemaingBalanceDate == null ? '' : moment(this.supRemaingBalanceDate).format('DD/MM/YYYY'),
      isActive: this.selectedSuppStatus['key'],
      userID: parseInt(localStorage.getItem('uId'))
    };
    if (this.isEdit) {
      newOderObj.supID = this.editTableData['supID'];
      this.dataFetchServ.updateSupplier(newOderObj).subscribe(res => {        
        this.toastService.displayToast({
          severity: 'info',
          summary: 'Update Supplier',
          detail: 'Supplier updated succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    } else {
      this.dataFetchServ.saveSupplier(newOderObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'New Supplier',
          detail: 'Supplier added succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    }
  }

  goBack() {
    this.dynamicDialogRef.close(null);
  }


}
