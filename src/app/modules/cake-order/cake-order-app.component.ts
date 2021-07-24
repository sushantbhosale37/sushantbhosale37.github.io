import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/primeng';
import { CommonLibService } from 'src/app/_services';
import { FetchApiDataService } from './fetch-api-data.service';
import { NewCakeOrderComponent } from './new-cake-order/new-cake-order.component';
import { ExportRequest } from 'src/app/_interfaces/exportRequest';
import { UpdateStatusFormComponent } from './update-status/update-status-form.component';
import { NewSalesComponent } from '../sales/new-sales/new-sales.component';

@Component({
  selector: 'ym-cake-order-app-app',
  templateUrl: './cake-order-app.component.html',
  styleUrls: ['./cake-order-app.component.scss']
})
export class CakeOrderAppComponent implements OnInit, OnDestroy {
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
    private libServ: CommonLibService,
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
        field: 'custMobile',
        displayName: 'Mobile No.',
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
        field: 'ordDate',
        displayName: 'Order Date',
        format: '',
        width: '130',
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
        field: 'deliveryDate',
        displayName: 'Delivery Date',
        format: '',
        width: '130',
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
        field: 'deliveryTime',
        displayName: 'Delivery Time',
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
        field: 'advPayment',
        displayName: 'Advance Payment',
        format: 'Rs.',
        width: '120',
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
        field: 'paymentMode',
        displayName: 'Payment Mode',
        format: '',
        width: '100',
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
        field: 'edit',
        displayName: 'Edit',
        format: '',
        width: '100',
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
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'deliveryStatus',
        displayName: 'Status',
        format: '',
        width: '100',
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
      page_size: 10,
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
    this.dataFetchServ.getGetOrderData(req).subscribe(data => {
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

  NewCakeOrder() {
    const data = {
      isEdit: false
    };

    const ref = this.dialogService.open(NewCakeOrderComponent, {
      data: data,
      header: 'New Cake Order',
      contentStyle: { width: '75vw' },
    });

    ref.onClose.subscribe(() => {
      this.getTableData();
    }
    );
  }

  updateCakeOrder(rowData) {
    const ref = this.dialogService.open(UpdateStatusFormComponent, {
      data: rowData,
      header: 'Update Status',
      contentStyle: { width: '40vw' },
    });
    ref.onClose.subscribe(() => {
      this.getTableData();
    }
    );
  }

  makeBill(rowData) {
    const data = {
      isEdit: false,
      isOrder: true,
      custID:rowData['custID'],
      custName: rowData['custName'],
      prodID: rowData['prodID'],
      advPayment: rowData['advPayment'],
      ordID: rowData['ordID'],
    };
    const ref = this.dialogService.open(NewSalesComponent, {
      data: data,
      header: 'New Sales',
      contentStyle: { width: '75vw' },
    });
    ref.onClose.subscribe(() => {
      this.getTableData();
    }
    );
  }

  editCakeOrder(rowData) {
    const data = {
      isEdit: true,
      data: rowData,
      table: this.noTableData
    };
    const ref = this.dialogService.open(NewCakeOrderComponent, {
      data: data,
      header: 'Update Cake Order',
      contentStyle: { width: '75vw' },
    });
    ref.onClose.subscribe(() => {
      this.getTableData();
    });
  }

  ngOnDestroy(): void {
    if (this.appConfigObs && !this.appConfigObs.closed) {
      this.appConfigObs.unsubscribe();
    }
  }
}
