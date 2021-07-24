import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/primeng';
import { CommonLibService } from 'src/app/_services';
import { FetchApiDataService } from './fetch-api-data.service';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ExportRequest } from 'src/app/_interfaces/exportRequest';

@Component({
  selector: 'ym-customer-app-app',
  templateUrl: './customer-app.component.html',
  styleUrls: ['./customer-app.component.scss']
})
export class CustomerAppComponent implements OnInit, OnDestroy {
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
  ) {
  }

  ngOnInit() {
        this.initialLoading();
    this.flatTableColumnDef = [
      {
        field: 'custName',
        displayName: 'Customer Name',
        format: '',
        width: '220',
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
        field: 'custMobile',
        displayName: 'Mobile No.',
        format: '',
        width: '140',
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
        field: 'custBdate',
        displayName: 'Birth Date',
        format: '',
        width: '140',
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
        field: 'anniversaryDate',
        displayName: 'Anniversary Date',
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
        field: 'address',
        displayName: 'Address',
        format: '',
        width: '220',
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
        field: 'pinCode',
        displayName: 'PinCode',
        format: '',
        width: '110',
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
        field: 'isActive',
        displayName: 'Status',
        format: '',
        width: '80',
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
    this.getTableData();
  }

  getTableData() {
    const req = {
      id: 0
    };
    this.dataFetchServ.getCustomerData(req).subscribe(data => {
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
      this.getTableData();
    }
    );
  }
  
  deleteCustomer(rowData) {
    let req = {
      flag: 'Customer',
      id: rowData['custID']
    }
    const msg = 'Do you want to delete Customer';
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.dataFetchServ.deleteCustomer(req).subscribe(() => {
            this.toastService.displayToast({
              severity: 'info',
              summary: 'Delete Customer',
              detail: 'Customer deleted succesfully',
              life: 10000
            });
          this.getTableData();
        });
      },
      reject: () => {
      }
    });
  }

  editCustomer(rowData) {
    const data = {
      isEdit: true,
      data: rowData,
      table: this.noTableData
    };
    const ref = this.dialogService.open(NewCustomerComponent, {
      data: data,
      header: 'Update Customer',
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
