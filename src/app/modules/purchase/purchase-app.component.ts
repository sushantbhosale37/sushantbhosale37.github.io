import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';
import { AppConfigService, CommonLibService, ToastService, PlatformConfigService } from 'src/app/_services';
import { FetchApiDataService } from './fetch-api-data.service';
import { DialogService } from 'primeng/primeng';
import { Subscription, from } from 'rxjs';
import { NewPurchaseComponent } from './new-purchase/new-purchase.component';

@Component({
  selector: 'ym-purchase-app',
  templateUrl: './purchase-app.component.html',
  styleUrls: ['./purchase-app.component.scss']
})
export class PurchaseAppComponent implements OnInit {
  private appConfigObs: Subscription;
  flatTableColumnDef: any[];
  flatTableJson: Object;
  noTableData = false;
  tblResData: any[];
  flatTableData: TreeNode[];

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
  ) {}

  ngOnInit() {
    this.initialLoading();

    this.flatTableColumnDef = [
      {
        field: 'receiptNo',
        displayName: 'Receipt No',
        format: '',
        width: '110',
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
        field: 'supplierCode',
        displayName: 'Supplier Code',
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
        field: 'supplierName',
        displayName: 'Supplier Name',
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
        field: 'pDate',
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
      // frozenWidth: '250px',
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

    this.dataFetchServ.getPurchaseData(req).subscribe(data => {
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

  NewPurchase() {
    const data = {
      isEdit: false
    };

    const ref = this.dialogService.open(NewPurchaseComponent, {
      data: data,
      header: 'New Purchase',
      contentStyle: { width: '75vw' },
    });

    ref.onClose.subscribe((data: string) => {
      this.getTableData();
    }
    );
  }

  onFiltersApplied(filterData: object) {
  }

  deletePurchase(rowData) {
    let req = {
      flag: 'Purchase',
      id: rowData['purchaseID']

    }
    const msg = 'Do you want to delete Purchase';
    const toastMsg = 'Delete Purchase';
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.dataFetchServ.deletePurchase(req).subscribe(data => {
          this.toastService.displayToast({
            severity: 'info',
            summary: 'Delete Purchase',
            detail: 'Purchase deleted succesfully',
            life: 10000
          });
          this.getTableData();
        });
      },
      reject: () => {
      }
    });

  }

  editPurchase(rowData) {
    const data = {
      isEdit: true,
      data: rowData,
      table: this.noTableData
    };

    const ref = this.dialogService.open(NewPurchaseComponent, {
      data: data,
      header: 'New Purchase',
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
