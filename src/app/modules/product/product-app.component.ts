import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TreeNode, ConfirmationService } from 'primeng/api';
import * as moment from 'moment';
import { DialogService } from 'primeng/primeng';
import { CommonLibService, AppConfigService, PlatformConfigService } from 'src/app/_services';
import { FetchApiDataService } from './fetch-api-data.service';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';
import { NewProductComponent } from './new-product/new-product.component';
import { ExportRequest } from 'src/app/_interfaces/exportRequest';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'ym-product-app-app',
  templateUrl: './product-app.component.html',
  styleUrls: ['./product-app.component.scss']
})
export class ProductAppComponent implements OnInit, OnDestroy {
  private appConfigObs: Subscription;

  appConfig: object = {};
  lastUpdatedOn: Date;
  tableRequestParam = {};
  favoriteCollection = {};
  filtersApplied: object = {};
  allStatus: any;
  messages = [];
  unreadCount = 0;
  nextUpdated: Date;
  dataUpdatedThrough: Date;
  exportRequest: ExportRequest = <ExportRequest>{};
  flatTableReq: object;
  flatTableData: TreeNode[];
  flatTableColumnDef: any[];
  flatTableJson: Object;
  tblResData: any[];
  displayAggTable = true;
  noTableData = false;
  isExportReport = false;
  prodCategoryOptions: any[];
  formNewRioModel: FormGroup;
  selectedProdCategory: object;

  constructor(
    private confirmationService: ConfirmationService,
    private appConfigService: AppConfigService,
    private libServ: CommonLibService,
    private toastService: ToastService,
    private dialogService: DialogService,
    private formatNumPipe: FormatNumPipe,
    private dataFetchServ: FetchApiDataService,
    private platformConfigService: PlatformConfigService,
    private fb: FormBuilder
  ) {  }

  ngOnInit() {
        this.initialLoading();
    this.flatTableColumnDef = [
      {
        field: 'prodName',
        displayName: 'Product Name',
        format: '',
        width: '300',
        value: '',
        condition: '',
        columnType: 'dimensions',
        isClearSearch: true,
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
          colSearch: true,
          colSort: true,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'categoryName',
        displayName: 'Category',
        format: '',
        width: '150',
        value: '',
        condition: '',
        columnType: 'dimensions',
        isClearSearch: true,
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
          colSearch: true,
          colSort: true,
          resizable: true,
          movable: false
        }
      },

      {
        field: 'measureType',
        displayName: 'Measurement',
        format: '',
        width: '120',
        value: '',
        condition: '',
        columnType: 'dimensions',
        isClearSearch: true,
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
          colSearch: true,
          colSort: true,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'prodDescription',
        displayName: 'Description',
        format: '',
        width: '250',
        value: '',
        condition: '',
        columnType: 'dimensions',
        isClearSearch: true,
        exportConfig: {
          format: 'currency',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: true,
          colSort: true,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'prodRate',
        displayName: 'Rate',
        format: 'Rs.',
        width: '80',
        value: '',
        condition: '',
        columnType: 'dimensions',
        isClearSearch: true,
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
          colSearch: true,
          colSort: true,
          resizable: true,
          movable: false
        }
      },

      {
        field: 'prodQty',
        displayName: 'QTY',
        format: 'number',
        width: '80',
        value: '',
        condition: '',
        columnType: 'dimensions',
        isClearSearch: true,
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
          colSearch: true,
          colSort: true,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'isActive',
        displayName: 'Status',
        format: '',
        width: '80',
        value: '',
        condition: '',
        columnType: 'dimensions',
        isClearSearch: true,
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
          colSearch: true,
          colSort: true,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'edit',
        displayName: 'Edit',
        format: '',
        width: '80',
        value: '',
        condition: '',
        columnType: 'dimensions',
        isClearSearch: true,
        exportConfig: {
          format: 'number',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: true,
          colSort: true,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'delete',
        displayName: 'Delete',
        format: '',
        width: '80',
        value: '',
        condition: '',
        columnType: 'dimensions',
        isClearSearch: true,
        exportConfig: {
          format: 'number',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: true,
          colSort: true,
          resizable: true,
          movable: false
        }
      }
    ];

    this.flatTableJson = {
      page_size: 50,
      page: 0,
      lazy: false,
      loading: false,
      export: true,
      sortMode: 'multiple',
      resizableColumns: true,
      columnResizeMode: 'fit',
      reorderableColumns: true,
      scrollHeight: '400px',
      totalRecords: 1000,
      columns: this.flatTableColumnDef.slice(0),
      selectedColumns: this.flatTableColumnDef.slice(0),
      frozenCols: [this.flatTableColumnDef[0]],
      // frozenWidth: '250px',
      frozenWidth:
        this.flatTableColumnDef
          .slice(0, 0)
          .reduce((tot, cur) => tot + parseInt(cur.width, 10), 0) + 'px',
      // columns: this.flatTableColumnDef.slice(this.flatTableColumnDef.length-1),
      // selectedColumns: [this.flatTableColumnDef],
      // frozenCols: [this.flatTableColumnDef[0]],
      // frozenWidth:
      //   this.flatTableColumnDef
      //     .slice(0, 1)
      //     .reduce((tot, cur) => tot + parseInt(cur.width, 10), 0) + 'px',
      scrollable: true,
      selectionMode: 'multiple',
      selectedColsModal: [],
      selectionDataKey: 'name',
      metaKeySelection: true,
      showHideCols: true,
      overallSearch: true,
      columnSearch: true
    };
  }

  initialLoading() {
    this.formNewRioModel = this.fb.group({
      selectedProdCategory: new FormControl('', Validators.required)
    });
    this.getTableData(0);
    this.getFilters();
  }

  get f() {
    return this.formNewRioModel.controls;
  }

  getFilters() {
    let reqProdCategory = {
      flag: 'Category',
      Id: 0
    }
    this.dataFetchServ.getFilterValues(reqProdCategory).subscribe(res => {
      let ProdCategory = [];
      res['table'].forEach(element => {
        ProdCategory.push({ label: element['categoryName'], key: element['catID'] });
      });
      this.prodCategoryOptions = ProdCategory;
    });    
  }

  getTableDataByCategory() {
    let prodCategoryID = this.selectedProdCategory['key']; 
    this.getTableData(prodCategoryID);  
  }

  getTableData(prodCategoryID) {
    const req = {
      id: 0,
      catId: prodCategoryID
    };

    this.dataFetchServ.getGetProductData(req).subscribe(data => {
      this.noTableData = false;
      const arr = [];
      let resultData = data as [];
      for (const r of resultData) {
        const obj = {};
        obj['data'] = r;
        arr.push(obj);
      }

      this.tblResData = arr;

      this.flatTableData = <TreeNode[]>arr;
      this.flatTableJson['totalRecords'] = data['totalItems'];
      this.flatTableJson['loading'] = false;
      setTimeout(() => {
        this.flatTableJson['lazy'] = false;
      }, 0);
    });
  }

  reLoadTableData() {
    const tableReq = this.libServ.deepCopy(this.tableRequestParam);
    tableReq.filters = this.libServ.deepCopy(this.filtersApplied['filters']);
  }

  onLazyLoadAggTable(e: Event) {
    this.getTableData(0);
  }

  isHiddenColumn(col: Object) {
    return (
      this.flatTableJson['selectedColumns'].some(
        (c: Object) => c['field'] === col['field']
      ) ||
      this.flatTableJson['frozenCols'].some(
        (c: Object) => c['field'] === col['field']
      )
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

    ref.onClose.subscribe((data: string) => {
      this.getTableData(0);
    }
    );
  }

  deleteProduct(rowData) {
    let req = {
      flag: 'Product',
      id: rowData['ordID']

    }
    const msg = 'Do you want to delete Product';
    const toastMsg = 'Delete Product';
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.dataFetchServ.deleteProduct(req).subscribe(data => {
            this.toastService.displayToast({
              severity: 'info',
              summary: 'Delete Product',
              detail: 'Product deleted succesfully',
              life: 10000
            });
          this.getTableData(0);

        });
      },
      reject: () => {
      }
    });
  }

  editProduct(rowData) {
    const data = {
      isEdit: true,
      data: rowData,
      table: this.noTableData
    };

    const ref = this.dialogService.open(NewProductComponent, {
      data: data,
      header: 'New Product',
      contentStyle: { width: '50vw' },
    });
    ref.onClose.subscribe((data: string) => {
      this.getTableData(0);
    });
  }

  ngOnDestroy(): void {
    if (this.appConfigObs && !this.appConfigObs.closed) {
      this.appConfigObs.unsubscribe();
    }
  }
}
