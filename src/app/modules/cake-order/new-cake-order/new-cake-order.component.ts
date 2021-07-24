import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/primeng';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { ExportRequest } from 'src/app/_interfaces/exportRequest';
import { environment } from 'src/environments/environment';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { DialogService } from 'primeng/primeng';
import { NewProductComponent } from '../../product/new-product/new-product.component';
import { NewCustomerComponent } from '../../customer/new-customer/new-customer.component';

@Component({
  selector: 'ym-new-cake-order',
  templateUrl: './new-cake-order.component.html',
  styleUrls: ['./new-cake-order.component.scss'],
  providers: [DialogService]
})
export class NewCakeOrderComponent implements OnInit {
  BASE_URL: string = environment.baseUrl;
  filterUrl: string = this.BASE_URL + '/afar/v1/rio/filter';
  exportRequest: ExportRequest = <ExportRequest>{};
  formNewRioModel: FormGroup;
  selectedCustName: object;
  Mobile: string;
  OrdDate: Date;
  selectedCakeProduct: object;
  selectedCakeShape: object;
  CakeTheme: string;
  DeliveryDate: Date;
  selectedDeliveryTime: Date;
  NameOnCake: string;
  SplNote: string;
  advPayment: string;
  rate: string;
  paymentMode: string = 'Cash';
  DeliveryStatus = 'Pending'
  CustNameOptions: any[];
  CakeProductOptions: any[];
  CakeShapeOptions: any[];
  DeliveryTimeOptions: any[];
  editTableData: Object;
  isEdit = false;
  namefile: any[];
  update: any;
  deleteFile = false;
  uploadFile = false;
  downloadFile = false;
  frameUploader: any;
  files: any;
  tbleData: any[];
  table: any;

  constructor(
    private dataFetchServ: FetchApiDataService,
    private config: DynamicDialogConfig,
    private toastService: ToastService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private dynamicDialogRef: DynamicDialogRef
  ) {
    this.isEdit = this.config.data['isEdit'];
    if (this.isEdit) { this.editTableData = this.config.data['data']; } else {
      this.tbleData = this.config.data['data'];
      this.table = this.config.data['table'];
    }
  }

  ngOnInit() {
    this.formNewRioModel = this.fb.group({
      selectedCustName: new FormControl('', Validators.required),
      Mobile: new FormControl('', Validators.required),
      OrdDate: new FormControl(),
      selectedCakeShape: new FormControl('', Validators.required),
      selectedCakeProduct: new FormControl('', Validators.required),
      CakeTheme: new FormControl(),
      SplNote: new FormControl(),
      NameOnCake: new FormControl(),
      DeliveryDate: new FormControl('', Validators.required),
      selectedDeliveryTime: new FormControl('', Validators.required),
      advPayment: new FormControl(),
      rate: new FormControl(),
      paymentMode: new FormControl(),
      DeliveryStatus: new FormControl()
    });
    this.DeliveryDate = moment().toDate();
    this.OrdDate = moment().toDate();
    this.advPayment = "0";
    this.DeliveryTimeOptions = [
      { label: 'Morning', key: 'Morning' },
      { label: 'Afternoon', key: 'Afternoon' },
      { label: 'Evening', key: 'Evening' },
      { label: 'Night', key: 'Night' }
    ];
    this.getFilters();
    if (this.isEdit) {
      this.Mobile = this.editTableData['custMobile'];
      this.OrdDate = moment(this.editTableData['ordDate'], 'DD/MM/YYYY').toDate();
      this.CakeTheme = this.editTableData['cakeTheme'];
      this.SplNote = this.editTableData['splNote'];
      this.NameOnCake = this.editTableData['nameOnCake'];
      this.DeliveryDate = moment(this.editTableData['deliveryDate'], 'DD/MM/YYYY').toDate();
      this.selectedDeliveryTime =moment(this.editTableData['deliveryTime'], 'hh:mm A').toDate();
      this.advPayment = this.editTableData['advPayment'];
      this.paymentMode = this.editTableData['paymentMode'];
      this.DeliveryStatus = this.editTableData['deliveryStatus'];
    }
  }

  get f() {
    return this.formNewRioModel.controls;
  }

  getFilters() {
    let reqcakeshape = {
      flag: 'CakeShape',
      Id: 0
    }
    this.dataFetchServ.getFilterValues(reqcakeshape).subscribe(res => {
      let cakeshape = [];
      res['table'].forEach(element => {
        cakeshape.push({ label: element['cakeShape'], key: element['shapeID'] });
      });
      this.CakeShapeOptions = cakeshape;
      if (this.isEdit) {
        this.selectedCakeShape = this.CakeShapeOptions.find(x => x.label == this.editTableData['cakeShape']);
      }
    });
    let reqcakeproduct = {
      flag: 'ProdCat',
      Id: 1
    };
    this.dataFetchServ.getGetCakeProductData(reqcakeproduct).subscribe(res => {
      let cakeproduct = [];
      res['table'].forEach(element => {
        cakeproduct.push({ label: element['prodName'], key: element['prodID'], value: element });
      });
      this.CakeProductOptions = cakeproduct;
      if (this.isEdit) {
        this.selectedCakeProduct = this.CakeProductOptions.find(x => x.label == this.editTableData['prodName'])
        this.productChange();
      }
      console.log('this.selectedCakeProduct', this.selectedCakeProduct)
    });
    let reqCustomerData = {
      flag: 'Customer',
      Id: 0
    };
    this.dataFetchServ.getCustomerData(reqCustomerData).subscribe(res => {
      let CustomerData = [];
      res['table'].forEach(element => {
        CustomerData.push({ label: element['custName'], key: element['custID'], custMobile: element['custMobile'] });
      });
      this.CustNameOptions = CustomerData;
      if (this.isEdit) {
        this.selectedCustName = this.CustNameOptions.find(x => x.label == this.editTableData['custName']);
      }
    });
  }

  submitHandler() {
    console.log(this.selectedCakeProduct);
    const newOderObj = {
      ordID: 0,
      ordNo: 1,
      custID: this.selectedCustName['key'],
      prodID: this.selectedCakeProduct['key'],
      ordDate: moment(this.OrdDate).format('DD/MM/YYYY'),
      cakeShapeID: this.selectedCakeShape['key'],
      cakeTheme: this.CakeTheme,
      splNote: this.SplNote,
      nameOnCake: this.NameOnCake,
      deliveryDate: moment(this.DeliveryDate).format('DD/MM/YYYY'),
      deliveryTime: moment(this.selectedDeliveryTime).format('hh:mm A'),
      advPayment: this.advPayment,
      paymentMode: this.paymentMode,
      deliveryStatus: this.DeliveryStatus,
      userID: parseInt(localStorage.getItem('uId'))
    };
    if (this.isEdit) {
      newOderObj.ordID = this.editTableData['ordID'];
      newOderObj.ordNo = this.editTableData['ordNo'];
      this.dataFetchServ.updateInsertionOrder(newOderObj).subscribe(() => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'Update Order',
          detail: 'Order updated succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    } else {
      this.dataFetchServ.saveInsertionOrder(newOderObj).subscribe(() => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'New Order',
          detail: 'Order added succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    }
  }

  customerChange() {
    this.Mobile = this.selectedCustName['custMobile'];
  }
  productChange() {
    this.rate = this.selectedCakeProduct['value']['prodRate'];
  }

  goBack() {
    this.dynamicDialogRef.close(null);
  }

  NewCustomer() {
    const data = {
      isEdit: false
    };
    const ref = this.dialogService.open(NewCustomerComponent, {
      data: data,
      header: 'New Customer',
      contentStyle: { width: '75vw' },
    });
    ref.onClose.subscribe(() => {
      let reqCustomerData = {
        Id: 0
      };
      this.dataFetchServ.getCustomerData(reqCustomerData).subscribe(res => {
        let CustomerData = [];
        let data = res as [];
        data.forEach(element => {
          CustomerData.push({ label: element['custName'], key: element['custID'] ,custMobile: element['custMobile']});
        });
        this.CustNameOptions = CustomerData;
      });
    }
    );
  }

  NewProduct() {
    const data = {
      isEdit: false
    };
    const ref = this.dialogService.open(NewProductComponent, {
      data: data,
      header: 'New Product',
      contentStyle: { width: '50vw' },
    });
    ref.onClose.subscribe(() => {
      let reqcakeproduct = {
        flag: 'ProdCat',
        Id: 1
      };
      this.dataFetchServ.getGetCakeProductData(reqcakeproduct).subscribe(res => {
        let cakeproduct = [];
        res['table'].forEach(element => {
          cakeproduct.push({ label: element['prodName'], key: element['prodID'] });
        });
        this.CakeProductOptions = cakeproduct;
      });
    }
    );
  }
  
}
