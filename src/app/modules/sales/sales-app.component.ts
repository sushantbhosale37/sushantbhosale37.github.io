import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/primeng';
import * as moment from 'moment';

import { CommonLibService, AppConfigService, PlatformConfigService } from 'src/app/_services';
import { FetchApiDataService } from './fetch-api-data.service';
import { ExportdataService } from 'src/app/_services/export/exportdata.service';
import { ExportPptService } from 'src/app/_services/export/export-ppt.service';
import { HtmltoimageService } from 'src/app/_services/screencapture/htmltoimage.service';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';

import { NewSalesComponent } from './new-sales/new-sales.component';
import { SheetDetails } from 'src/app/_interfaces/sheetDetails';
import { ExportRequest } from 'src/app/_interfaces/exportRequest';
import { FilterDataService } from '../../_services/filter-data/filter-data.service';



@Component({
  selector: 'ym-sales-app-app',
  templateUrl: './sales-app.component.html',
  styleUrls: ['./sales-app.component.scss']
})
export class SalesAppComponent implements OnInit, OnDestroy {
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

    private appConfigService: AppConfigService,
    private libServ: CommonLibService,
    private _titleService: Title,
    private toastService: ToastService,
    private dialogService: DialogService,
    private formatNumPipe: FormatNumPipe,
    private dataFetchServ: FetchApiDataService,
    private platformConfigService: PlatformConfigService,

  ) {


  }

  ngOnInit() {
    this.initialLoading();
    this.flatTableColumnDef = [
      {
        field: 'billNo',
        displayName: 'Bill No',
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
        field: 'custName',
        displayName: 'Customer Name',
        format: '',
        width: '240',
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
        field: 'salesDate',
        displayName: 'Date',
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
        field: 'netAmt',
        displayName: 'Net. Amount',
        format: 'Rs.',
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
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'discountAmt',
        displayName: 'Discount',
        format: 'Rs.',
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
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'totalAmt',
        displayName: 'Total Amount',
        format: 'Rs.',
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
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'deliveryCharges',
        displayName: 'Delivery Charges',
        format: 'Rs.',
        width: '100',
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
          colSearch: false,
          colSort: false,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'paymentMode',
        displayName: 'Payment Mode',
        format: '',
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
        field: 'advPayment',
        displayName: 'Adv. Payment',
        format: 'Rs.',
        width: '100',
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
          colSearch: false,
          colSort: false,
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
          colSearch: false,
          colSort: false,
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
          colSearch: false,
          colSort: false,
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
      columns: this.flatTableColumnDef.slice(2),
      selectedColumns: this.flatTableColumnDef.slice(2),
      frozenCols: [this.flatTableColumnDef[0], this.flatTableColumnDef[1]],
      frozenWidth:
        this.flatTableColumnDef
          .slice(0, 2)
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
      id: 0,
      StartDate: '',
      EndDate: ''
    };
    this.dataFetchServ.getSalesData(req).subscribe(data => {
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

  NewSales() {
    const data = {
      isEdit: false
    };
    const ref = this.dialogService.open(NewSalesComponent, {
      data: data,
      header: 'New Sales',
      contentStyle: { width: '75vw' },
    });
    ref.onClose.subscribe((data: string) => {
      this.getTableData();
    }
    );
  }

  deleteSales(rowData) {
    let req = {
      flag: 'Sales',
      id: rowData['saleID']

    }
    const msg = 'Do you want to delete Sales';
    const toastMsg = 'Delete Sales';
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.dataFetchServ.deleteSales(req).subscribe(data => {
          // if (data['status']) {
          this.toastService.displayToast({
            severity: 'info',
            summary: 'Delete Sales',
            detail: 'Sales deleted succesfully',
            life: 10000
          });
          // }
          this.getTableData();

        });
      },
      reject: () => {

      }
    });

  }

  editSales(rowData) {
    const data = {
      isEdit: true,
      data: rowData,
      table: this.noTableData
    };

    const ref = this.dialogService.open(NewSalesComponent, {
      data: data,
      header: 'New Sales',
      contentStyle: { width: '75vw' },
    });
    ref.onClose.subscribe((data: string) => {
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
