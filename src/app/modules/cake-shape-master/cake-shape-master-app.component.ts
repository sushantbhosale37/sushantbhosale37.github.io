import { Component, OnInit } from '@angular/core';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { FetchApiDataService } from './fetch-api-data.service';
import { CommonLibService, AppConfigService, PlatformConfigService } from 'src/app/_services';
import { DialogService } from 'primeng/primeng';
import { NewCakeShapeMasterComponent } from './new-cake-shape-master/new-cake-shape-master.component';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ym-cake-shape-master-app',
  templateUrl: './cake-shape-master-app.component.html',
  styleUrls: ['./cake-shape-master-app.component.scss']
})
export class CakeShapeMasterAppComponent implements OnInit {
  private appConfigObs: Subscription;
  flatTableData: TreeNode[];
  flatTableColumnDef: any[];
  flatTableJson: Object;
  noTableData = false;
  tblResData: any[];
  tableRequestParam = {};
  filtersApplied: object = {};

  constructor(
    private dataFetchServ: FetchApiDataService,
    private libServ: CommonLibService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.initialLoading();
    this.flatTableColumnDef = [
      {
        field: 'cakeShape',
        displayName: 'Cake Shape Name',
        format: '',
        width: '500',
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
    debugger;
    this.getTableData();
  }

  getTableData() {
    const req = {
      id: 0
    };
    this.dataFetchServ.getGetCakeShapeData(req).subscribe(data => {
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

  NewCakeShape() {
    const data = {
      isEdit: false
    };

    const ref = this.dialogService.open(NewCakeShapeMasterComponent, {
      data: data,
      header: 'New Cake Shape',
      contentStyle: { width: '50vw' },
    });

    ref.onClose.subscribe((data: string) => {
      this.getTableData();
    }
    );
  }

  deleteCakeShape(rowData) {
    let req = {
      flag: 'CakeShape',
      id: rowData['shapeID']
    }
    const msg = 'Do you want to delete Cake Shape';
    const toastMsg = 'Delete Cake Shape';
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.dataFetchServ.deleteCakeShape(req).subscribe(data => {
            this.toastService.displayToast({
              severity: 'info',
              summary: 'Delete Cake Shape',
              detail: 'Cake Shape deleted succesfully',
              life: 10000
            });
          this.getTableData();
        });
      },
      reject: () => {
      }
    });
  }

  editCakeShape(rowData) {
    const data = {
      isEdit: true,
      data: rowData,
      table: this.noTableData
    };

    const ref = this.dialogService.open(NewCakeShapeMasterComponent, {
      data: data,
      header: 'New Cake Shape',
      contentStyle: { width: '50vw' },
    });
    ref.onClose.subscribe((data: string) => {
      this.getTableData();
    });
  }

  ngOnDestroy(): void {
    if (this.appConfigObs && !this.appConfigObs.closed) {
      this.appConfigObs.unsubscribe();
    }
  }

}
