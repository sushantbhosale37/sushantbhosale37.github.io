import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonLibService } from 'src/app/_services';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';
import { FetchApiDataService } from '../fetch-api-data.service';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef, TreeNode, ConfirmationService } from 'primeng/primeng';
import { ExportdataService } from 'src/app/_services/export/exportdata.service';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { ExportRequest } from 'src/app/_interfaces/exportRequest';
import { environment } from 'src/environments/environment';
import { FilterDataService } from '../../../_services/filter-data/filter-data.service';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { DialogService } from 'primeng/primeng';
import { NewCustomerComponent } from '../../customer/new-customer/new-customer.component';
import { NewProductComponent } from '../../product/new-product/new-product.component';

@Component({
  selector: 'ym-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrls: ['./new-sales.component.scss'],
  providers: [DialogService]
})
export class NewSalesComponent implements OnInit {
  BASE_URL: string = environment.baseUrl;
  filterUrl: string = this.BASE_URL + '/afar/v1/rio/filter';
  exportRequest: ExportRequest = <ExportRequest>{};
  formNewRioModel: FormGroup;
  formProduct: FormGroup;
  isOrdered = false;
  billNo: string = '1';
  salesDate: Date;
  custMobile: string;
  netAmt: number;
  discountAmt: number;
  deliveryCharges: number;
  advPayment: number;
  totalAmt: number;
  paymentMode = 'Cash';
  qty: number;
  CustNameOptions: any[];
  ProdNameOptions: any[];
  selectedCustName: object;
  selectedProdName: object;

  editTableData: Object;
  isEdit = false;
  prodIndex = 0;
  isProductUpdate = false;

  flatTableData: TreeNode[];
  flatTableColumnDef: any[];
  flatTableJson: Object;
  salesData: any[];
  resQty: number;
  constructor(
    private libServ: CommonLibService,
    private formatNumPipe: FormatNumPipe,
    private dataFetchServ: FetchApiDataService,
    private config: DynamicDialogConfig,
    private exportService: ExportdataService,
    private toastService: ToastService,
    private filterDataService: FilterDataService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private dynamicDialogRef: DynamicDialogRef,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {
    this.isEdit = this.config.data['isEdit'];

    if (this.isEdit) { this.editTableData = this.config.data['data']; }
  }

  ngOnInit() {
    this.salesData = [];
    this.salesDate = moment().toDate();
    this.formNewRioModel = this.fb.group({
      isOrdered: new FormControl(),
      billNo: new FormControl(),
      salesDate: new FormControl('', Validators.required),
      selectedCustName: new FormControl('', Validators.required),
      custMobile: new FormControl('', Validators.required),
      netAmt: new FormControl('', Validators.required),
      discountAmt: new FormControl('', Validators.required),
      deliveryCharges: new FormControl('', Validators.required),
      advPayment: new FormControl('', Validators.required),
      paymentMode: new FormControl('', Validators.required),
      totalAmt: new FormControl('', Validators.required)
    });


    this.formProduct = this.fb.group({
      selectedProdName: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
    });
    
    this.flatTableColumnDef = [
      {
        field: 'prodName',
        displayName: 'Product',
        format: '',
        width: '200',
        isExpanded: 'false',
        exportConfig: {
          format: 'string',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: false
        }
      },

      {
        field: 'categoryName',
        displayName: 'Category',
        format: '',
        width: '150',
        exportConfig: {
          format: 'string',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: false
        }
      },

      {
        field: 'measureType',
        displayName: 'Measure',
        format: '',
        width: '150',
        exportConfig: {
          format: 'string',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'qty',
        displayName: 'Qty',
        format: '',
        width: '80',
        exportConfig: {
          format: '',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: true
        },
        footerTotal: '-'
      },
      {
        field: 'rate',
        displayName: 'Rate',
        format: '',
        width: '80',
        exportConfig: {
          format: '',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: true
        },
        footerTotal: '-'
      },
      {
        field: 'amount',
        displayName: 'Amount',
        format: '',
        width: '100',
        exportConfig: {
          format: '',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: true
        },
        footerTotal: '-'
      },
      {
        field: 'Update',
        displayName: 'Edit',
        format: '',
        width: '80',
        exportConfig: {
          format: '',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: true
        },
        footerTotal: '-'
      },
      {
        field: 'Delete',
        displayName: 'Delete',
        format: '',
        width: '80',
        exportConfig: {
          format: '',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: true
        },
        footerTotal: '-'
      }
    ];

    this.flatTableJson = {
      page_size: 10,
      page: 1,
      lazy: true,
      loading: false,
      // export: true,
      // sortMode: "multiple",
      resizableColumns: true,
      columnResizeMode: 'fit',
      reorderableColumns: true,
      scrollHeight: '200px',
      totalRecords: 1000,
      columns: this.libServ.deepCopy(this.flatTableColumnDef.slice(1)),
      selectedColumns: this.libServ.deepCopy(this.flatTableColumnDef.slice(1)),
      frozenCols: this.libServ.deepCopy([...this.flatTableColumnDef.slice(0, 1)]),
      frozenWidth:
        this.flatTableColumnDef
          .slice(0, 1)
          .reduce((tot, cur) => tot + parseInt(cur.width, 10), 0) + 'px',
      scrollable: true,
      selectionMode: 'multiple',
      selectedColsModal: [],
      selectionDataKey: 'name',
      metaKeySelection: true,
      showHideCols: true,
      overallSearch: false,
      columnSearch: false
    };

    this.getFilters().then(data =>{
      if (this.isEdit) {
        if (this.editTableData['isAdvOrder'] == 'True') {
          this.isOrdered = true;
        } else {
          this.isOrdered = false;
        }
        debugger;
        this.selectedCustName = {
          label: this.editTableData['custName'],
          key: this.editTableData['custID']
        };
        this.billNo = this.editTableData['billNo'];
        this.custMobile = this.editTableData['custMobile'];
        this.salesDate = moment(this.editTableData['salesDate'], 'DD/MM/YYYY').toDate();
        this.netAmt = this.editTableData['netAmt'];
        this.discountAmt = this.editTableData['discountAmt'];

        this.totalAmt = this.editTableData['totalAmt'];
        this.deliveryCharges = this.editTableData['deliveryCharges'];
        this.paymentMode = this.editTableData['paymentMode'];
        this.salesData = this.editTableData['salesDetails'];
        this.getTableData();
        setTimeout(() => {
          this.customerChange();
        }, 0);

      } else {
        this.getBillNumber();
      }

    });

  }
  get f() {
    return this.formNewRioModel.controls;
  }
  get p() {
    return this.formProduct.controls;
  }
  getBillNumber() {
    let reqcakeshape = {
      flag: 'LastSalesBillNo'
    }
    this.dataFetchServ.getFilterValues(reqcakeshape).subscribe(res => {
      this.billNo = 'CA-S00' + (res['table'][0]['saleID'] + 1);
    });
  }

  async getFilters() {

    let reqProductData = {
      flag: 'Product',
      Id: 0
    };
    await this.dataFetchServ.getFilterValues(reqProductData).subscribe(res => {
      let ProductData = [];
      res['table'].forEach(element => {
        ProductData.push({ label: element['prodName'], key: element['prodID'], value: element });
      });
      this.ProdNameOptions = ProductData;
    if (this.config.data['isOrder'] == true) {
      this.isOrdered = true;
      this.changeOrder();
      this.selectedCustName = {
        label: this.config.data['custName'],
        key: this.config.data['custID'],
        value: this.config.data
      };
      setTimeout(() => {
        this.customerChange();
      }, 0);

    } else {

      this.changeOrder();
    }
  });
  }

  IsOrderChange() {
    this.changeOrder();
    this.allDataClear();
  }

  changeOrder() {
    if (this.isOrdered) {
      let reqCustomerData = {
        Id: 0,
        flag: 'PendingOrder'
      };
      this.dataFetchServ.getRelativeFilterValues(reqCustomerData).subscribe(res => {
        let CustomerData = [];
        // let data = res as [];
        res['table'].forEach(element => {
          CustomerData.push({ label: element['custName'], key: element['custID'], value: element });
        });
        this.CustNameOptions = CustomerData;
        // this.custMobile = '';
      });
    } else {
      let reqCustomerData = {
        flag: 'Customer',
        Id: 0
      };
      this.dataFetchServ.getFilterValues(reqCustomerData).subscribe(res => {
        let CustomerData = [];
        // let data = res as [];
        res['table'].forEach(element => {
          CustomerData.push({ label: element['custName'], key: element['custID'] });
        });
        this.CustNameOptions = CustomerData;
        // this.custMobile = '';
      });
    }
  }


  allDataClear() {
    this.salesData = [];
    this.custMobile = '';
    this.selectedCustName = null;
    this.discountAmt = 0;
    this.deliveryCharges = 0;
    this.advPayment = 0;
    this.getTableData();

  }

  getTableData() {
    this.flatTableJson['loading'] = true;
    const arr = [];
    this.netAmt = 0;
    const fData = this.libServ.deepCopy(this.salesData);
    fData.forEach((r, index) => {
      const obj = {};
      r['index'] = index;
      this.netAmt = this.netAmt + r['amount'];
      obj['data'] = r;
      arr.push(obj);
    });
    this.flatTableData = <TreeNode[]>arr;
    this.flatTableJson['totalRecords'] = this.salesData.length;
    this.flatTableJson['loading'] = false;
    this.calculationAmount();
  }

  NewProductAdd() {
    let product = this.libServ.deepCopy(this.selectedProdName['value']);
    let newProduct = {
      prodID: product['prodID'],
      prodName: product['prodName'],
      catID: product['prodCategoryID'],
      categoryName: product['categoryName'],
      measureID: product['prodMeasureID'],
      measureType: product['measureType'],
      qty: this.qty,
      rate: product['prodRate'],
      amount: this.qty * product['prodRate']
    }

    this.dataFetchServ.checkAvailableProdQty(newProduct).subscribe(res => {      
      const resQty = parseInt(res.toString());
     if(resQty >=0){
      this.salesData.push(newProduct);

      this.getTableData();
      setTimeout(() => {
        this.selectedProdName = null;
        this.qty = null;
        this.cdr.detectChanges();
      }, 0);
     } 
     else{
       let AvailableQty = (newProduct.qty + (resQty));
      this.toastService.displayToast({
        severity: 'info',
        summary: 'Product Quantity',
        detail: 'Required product qty not available, ' + 'Total Available Qty ' +  AvailableQty,
        life: 10000
      });
     }

    });

    
  }

  UpdateProductAdd() {
    let product = this.libServ.deepCopy(this.selectedProdName['value']);
    let newProduct = {
      prodID: product['prodID'],
      prodName: product['prodName'],
      catID: product['prodCategoryID'],
      categoryName: product['categoryName'],
      measureID: product['prodMeasureID'],
      measureType: product['measureType'],
      qty: this.qty,
      rate: product['prodRate'],
      amount: this.qty * product['prodRate']
    }

    this.dataFetchServ.checkAvailableProdQty(newProduct).subscribe(res => {
      debugger;
      const resQty = parseInt(res.toString());
     if(resQty >=0){
      this.salesData[this.prodIndex] = newProduct;

      this.getTableData();

    setTimeout(() => {
      this.isProductUpdate = false;
      this.selectedProdName = null;
      this.qty = null;
      this.cdr.detectChanges();
    }, 0);
     } 
     else{
       let AvailableQty = (newProduct.qty + (resQty));
      this.toastService.displayToast({
        severity: 'info',
        summary: 'Product Quantity',
        detail: 'Required product qty not available, ' + 'Total Available Qty ' +  AvailableQty,
        life: 10000
      });
     }

    });

    
  }

  deleteSalesDetails(rowData) {
    console.log('delete', rowData)
    const msg = 'Do you want to delete product';
    const toastMsg = 'Delete Product';
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.salesData.splice(rowData['index'], 1);
        this.getTableData();
        setTimeout(() => {
          this.prodIndex = 0;
          this.isProductUpdate = false;
          this.selectedProdName = null;
          this.qty = null;
          this.cdr.detectChanges();
        }, 0);
      },
      reject: () => {

      }
    });
  }

  CancelProductAdd() {
    setTimeout(() => {
      this.prodIndex = 0;
      this.isProductUpdate = false;
      this.selectedProdName = null;
      this.qty = null;
      this.cdr.detectChanges();
    }, 0);
  }

  editSalesDetails(rowData) {
    this.selectedProdName = this.ProdNameOptions.find(x => x.key == rowData['prodID'])
    this.qty = rowData['qty'];
    this.prodIndex = rowData['index'];
    this.isProductUpdate = true;
  }

  submitHandler() {
    console.log('familyData', this.salesData)
    let salesDetails = [];
    this.salesData.forEach(element => {
      salesDetails.push(
        {
          prodID: element.prodID,
          catID: element.catID,
          measureID: element.measureID,
          qty: element.qty,
          rate: element.rate,
          amount: element.amount
        }
      )
    });
    const newSalesObj = {
      isAdvOrder: (this.isOrdered).toString(),
      advOrdID: 0,
      advPayment: this.advPayment,
      saleID: 0,
      billNo: this.billNo,
      custID: this.selectedCustName['key'],
      salesDate: moment(this.salesDate).format('DD/MM/YYYY'),
      netAmt: this.netAmt,
      deliveryCharges: this.deliveryCharges,
      discountAmt: this.discountAmt,
      totalAmt: this.totalAmt,
      paymentMode: this.paymentMode,
      userID: parseInt(localStorage.getItem('uId')),
      salesDetails: salesDetails
    };
    this.isOrdered ? newSalesObj.advOrdID = this.selectedCustName['value']['ordID'] : ''
    if (this.isEdit) {
      newSalesObj.saleID = this.editTableData['saleID'];
      this.dataFetchServ.updateSales(newSalesObj).subscribe(res => {
        // console.log('status',res['status'])
        // if (res['status']) {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'Update Sales',
          detail: 'Sales updated succesfully',
          life: 10000
        });

        this.dynamicDialogRef.close(null);

        //   }
      });
    } else {
      this.dataFetchServ.saveSales(newSalesObj).subscribe(res => {
        // console.log('status',res['status'])
        // if (res['status']) {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'New Sales',
          detail: 'Sales added succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
        //   }
      });
    }
  }

  customerChange() {
    let reqState = {
      Id: this.selectedCustName['key']
    };
    this.dataFetchServ.getCustomerData(reqState).subscribe(res => {
      // let data = res as [];
      this.custMobile = res[0]['custMobile'];
      if (this.isOrdered) {
        this.selectedProdName = this.ProdNameOptions.find(x => x.key == this.selectedCustName['value']['prodID'])
        this.qty = 1;
        this.salesData = [];
        this.advPayment = this.selectedCustName['value']['advPayment']
        this.NewProductAdd();
      }
    });
  }

  calculationAmount() {
    if (this.discountAmt == null) {
      this.discountAmt = 0;
    }

    if (this.deliveryCharges == null) {
      this.deliveryCharges = 0;
    }

    if (this.advPayment == null) {
      this.advPayment = 0;
    }

    this.totalAmt = this.netAmt - this.discountAmt + this.deliveryCharges - this.advPayment;


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

    ref.onClose.subscribe((data: string) => {
      this.changeOrder();
    });
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

    ref.onClose.subscribe((data: string) => {
      this.getFilters();
    });
  }

  goBack() {
    this.dynamicDialogRef.close(null);
  }

  isHiddenColumn(col) { }
}
