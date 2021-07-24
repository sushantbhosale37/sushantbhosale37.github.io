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
import { NewSupplierComponent } from '../../supplier/new-supplier/new-supplier.component';
import { NewProductComponent } from '../../product/new-product/new-product.component';

@Component({
  selector: 'ym-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.scss'],
  providers: [DialogService]
})
export class NewPurchaseComponent implements OnInit {
  purchaseData: any[];
  formNewRioModel: FormGroup;
  formProduct: FormGroup;
  
  flatTableData: TreeNode[];
  flatTableColumnDef: any[];
  flatTableJson: Object;
  editTableData: Object;

  isEdit = false;
  prodIndex = 0;
  isProductUpdate = false;
  selectedProdName: object;
  selectedSupplierName: object;
  receiptNo: string = '1';
  pDate: Date;
  supMobile: string;
  discountAmt: number;
  deliveryCharges: number;
  advPayment: number;
  totalAmt: number;
  paymentMode = 'Cash';
  prodQty: number;
  supplierCode: string;
  ProdNameOptions: any[];
  SupplierNameOptions: any[];

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
    this.purchaseData = [];
    this.pDate = moment().toDate();
    this.formNewRioModel = this.fb.group({
      receiptNo: new FormControl(),      
      pDate: new FormControl('', Validators.required),
      supplierCode: new FormControl(),
      selectedSupplierName: new FormControl('', Validators.required),
      supMobile: new FormControl('', Validators.required),
      paymentMode: new FormControl('', Validators.required),
      totalAmt: new FormControl('', Validators.required)
    });

    
    this.formProduct = this.fb.group({
      selectedProdName: new FormControl('', Validators.required),
      prodQty: new FormControl('', Validators.required),
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
        field: 'prodQty',
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
        field: 'prodRate',
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
        field: 'prodAmt',
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
        
        this.selectedSupplierName = {
          label: this.editTableData['supplierName'],
          key: this.editTableData['supplierID']
        };
        this.receiptNo = this.editTableData['receiptNo'];
        this.supMobile = this.editTableData['supMobile'];
        
        this.pDate = moment(this.editTableData['pDate']).toDate();
        this.totalAmt = this.editTableData['totalAmt'];
        this.paymentMode = this.editTableData['paymentMode'];
        this.purchaseData = this.editTableData['purchaseDetails'];
        this.getTableData();
        setTimeout(() => {
          this.supplierChange();
        }, 0);

      } else {
        this.getReceiptNumber();
      }

    });

  }

  get f() {
    return this.formNewRioModel.controls;
  }
  get p() {
    return this.formProduct.controls;
  }

  getReceiptNumber() {
    let reqcakeshape = {
      flag: 'LastPurchaseBillNo'
    }
    this.dataFetchServ.getFilterValues(reqcakeshape).subscribe(res => {
      this.receiptNo = 'CA-P00' + (res['table'][0]['pid'] + 1);
    });
  }

  async getFilters() {

    let reqProductData = {
      flag: 'Product',
      Id: 0
    };
    await this.dataFetchServ.getFilterValues(reqProductData).subscribe(res => {
      let ProductData = [];
      // let data = res as [];
      res['table'].forEach(element => {
        ProductData.push({ label: element['prodName'], key: element['prodID'], value: element });
      });
      this.ProdNameOptions = ProductData;
      this.changeOrder();
  });
  }

  changeOrder() {
    
      let reqSupplierData = {
        flag: 'Supplier',
        Id: 0
      };
      this.dataFetchServ.getFilterValues(reqSupplierData).subscribe(res => {
        debugger;
        let SupplierData = [];
        res['table'].forEach(element => {
          SupplierData.push({ label: element['supplierName'], key: element['supplierID'] });
        });
        this.SupplierNameOptions = SupplierData;
      });
  }
  
  allDataClear() {
    this.purchaseData = [];
    this.supplierCode = '';
    this.supMobile = '';
    this.selectedSupplierName = null;
    this.getTableData();

  }

  getTableData() {
    this.flatTableJson['loading'] = true;
    const arr = [];
    this.totalAmt = 0;
    const fData = this.libServ.deepCopy(this.purchaseData);
    fData.forEach((r, index) => {
      const obj = {};
      r['index'] = index;
      this.totalAmt = this.totalAmt + r['prodAmt'];
      obj['data'] = r;
      arr.push(obj);
    });
    this.flatTableData = <TreeNode[]>arr;
    this.flatTableJson['totalRecords'] = this.purchaseData.length;
    this.flatTableJson['loading'] = false;
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
      prodQty: this.prodQty,
      prodRate: product['prodRate'],
      prodAmt: this.prodQty * product['prodRate']
    }
    this.purchaseData.push(newProduct);

    this.getTableData();
    setTimeout(() => {
      this.selectedProdName = null;
      this.prodQty = null;
      this.cdr.detectChanges();
    }, 0);

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
      prodQty: this.prodQty,
      prodRate: product['prodRate'],
      prodAmt: this.prodQty * product['prodRate']
    }
    this.purchaseData[this.prodIndex] = newProduct;

    // console.log('pppppp', product, this.prodIndex, this.salesData);
    this.getTableData();

    setTimeout(() => {
      // this.prodIndex = 0;
      this.isProductUpdate = false;
      this.selectedProdName = null;
      this.prodQty = null;
      this.cdr.detectChanges();
    }, 0);
  }

  deletePurchaseDetails(rowData) {
    console.log('delete', rowData)
    const msg = 'Do you want to delete product';
    const toastMsg = 'Delete Product';
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.purchaseData.splice(rowData['index'], 1);
        this.getTableData();
        setTimeout(() => {
          this.prodIndex = 0;
          this.isProductUpdate = false;
          this.selectedProdName = null;
          this.prodQty = null;
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
      this.prodQty = null;
      this.cdr.detectChanges();
    }, 0);
  }

  editPurchaseDetails(rowData) {
    this.selectedProdName = this.ProdNameOptions.find(x => x.key == rowData['prodID'])
    this.prodQty = rowData['prodQty'];
    this.prodIndex = rowData['index'];
    this.isProductUpdate = true;
  }

  submitHandler() {
    console.log('productData', this.purchaseData)
    let purchaseDetails = [];
    this.purchaseData.forEach(element => {
      purchaseDetails.push(
        {
          prodID: element.prodID,
          catID: element.catID,
          measureID: element.measureID,
          prodQty: element.prodQty,
          prodRate: element.prodRate,
          prodAmt: element.prodAmt
        }
      )
    });
    const newPurchaseObj = {
      purchaseID: 0,
      receiptNo: this.receiptNo,
      supplierID: this.selectedSupplierName['key'],
      pDate: moment(this.pDate).format('DD/MM/YYYY'),
      totalAmt: this.totalAmt,
      paymentMode: this.paymentMode,
      userID: parseInt(localStorage.getItem('uId')),
      purchaseDetails: purchaseDetails
    };
    if (this.isEdit) {
      newPurchaseObj.purchaseID = this.editTableData['purchaseID'];
      this.dataFetchServ.updatePurchase(newPurchaseObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'Update Purchase',
          detail: 'Purchase updated succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    } else {
      this.dataFetchServ.savePurchase(newPurchaseObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'New Purchase',
          detail: 'Purchase added succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    }
  }

  supplierChange() {
    let reqState = {
      Id: this.selectedSupplierName['key']
    };
    this.dataFetchServ.getSupplierData(reqState).subscribe(res => {
      this.supMobile = res[0]['supMobile'];
      this.supplierCode = res[0]['supplierCode'];
    });
  }

  // calculationAmount() {
  //   if (this.discountAmt == null) {
  //     this.discountAmt = 0;
  //   }

  //   if (this.deliveryCharges == null) {
  //     this.deliveryCharges = 0;
  //   }

  //   if (this.advPayment == null) {
  //     this.advPayment = 0;
  //   }

  //   this.totalAmt = this.netAmt - this.discountAmt + this.deliveryCharges - this.advPayment;


  // }

  NewSupplier() {
    const data = {
      isEdit: false
    };
debugger;
    const ref = this.dialogService.open(NewSupplierComponent, {
      data: data,
      header: 'New Supplier',
      contentStyle: { width: '75vw' },
    });

    // ref.onClose.subscribe((data: string) => {
    //   this.changeOrder();
    // });
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
