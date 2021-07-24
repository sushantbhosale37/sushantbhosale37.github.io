import { Component, OnInit } from '@angular/core';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ExportRequest } from 'src/app/_interfaces/exportRequest';
import { CommonLibService, ToastService } from 'src/app/_services';
import { FetchApiDataService } from '../supplier/fetch-api-data.service';
import { DialogService } from 'primeng/primeng';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';

@Component({
  selector: 'ym-supplier-app',
  templateUrl: './supplier-app.component.html',
  styleUrls: ['./supplier-app.component.scss']
})
export class SupplierAppComponent implements OnInit {
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
  constructor(
    private confirmationService: ConfirmationService,
    private libServ: CommonLibService,
    private toastService: ToastService,
    private dialogService: DialogService,
    private dataFetchServ: FetchApiDataService,
  ) { }
 
  ngOnInit() {
        this.initialLoading();
   
    this.flatTableColumnDef = [
      {
        field: 'supplierCode',
        displayName: 'Code',
        format: '',
        width: '100',
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
        field: 'supplierName',
        displayName: 'Supplier Name',
        format: '',
        width: '250',
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
        field: 'supMobile',
        displayName: 'Mobile',
        format: '',
        width: '100',
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
        field: 'supAddress',
        displayName: 'Address',
        format: '',
        width: '250',
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
        field: 'supGstPAN',
        displayName: 'GST/PAN',
        format: '',
        width: '100',
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
        field: 'supEMail',
        displayName: 'Email',
        format: '',
        width: '230',
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
        field: 'supRemainingBalance',
        displayName: 'Remaining Bal',
        format: '',
        width: '100',
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
        width: '100',
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
        width: '50',
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
        width: '50',
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
      frozenWidth:
        this.flatTableColumnDef
          .slice(0, 0)
          .reduce((tot, cur) => tot + parseInt(cur.width, 10), 0) + 'px',
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
    this.getTableData();
  }

  getTableData() {
    const req = {
      id: 0
    };
    this.dataFetchServ.getSupplierData(req).subscribe(data => {
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

  onLazyLoadAggTable() {
    this.getTableData();
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

  NewSupplier() {
    const data = {
      isEdit: false
    };
    const ref = this.dialogService.open(NewSupplierComponent, {
      data: data,
      header: 'New Supplier',
      contentStyle: { width: '75vw' },
    });
    ref.onClose.subscribe(() => {
      this.getTableData();
    }
    );
  }

  deleteSupplier(rowData) {
    let req = {
      flag: 'Supplier',
      id: rowData['supID']
    }
    const msg = 'Do you want to delete Supplier';
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.dataFetchServ.deleteSupplier(req).subscribe(() => {
          this.toastService.displayToast({
              severity: 'info',
              summary: 'Delete Supplier',
              detail: 'Supplier deleted succesfully',
              life: 10000
            });
          this.getTableData();
        });
      },
      reject: () => {
      }
    });
  }

  editSupplier(rowData) {
    const data = {
      isEdit: true,
      data: rowData,
      table: this.noTableData
    };
    const ref = this.dialogService.open(NewSupplierComponent, {
      data: data,
      header: 'Update Supplier',
      contentStyle: { width: '75vw' },
    });
    ref.onClose.subscribe(() => {
      this.getTableData();
    }
    );
  }

  ngOnDestroy(): void {
    if (this.appConfigObs && !this.appConfigObs.closed) {
      this.appConfigObs.unsubscribe();
    }
  }

}

