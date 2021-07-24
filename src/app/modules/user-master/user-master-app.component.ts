import { Component, OnInit } from '@angular/core';
import { ConfirmationService, DialogService, TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CommonLibService, ToastService } from 'src/app/_services';
import { FetchApiDataService } from './fetch-api-data.service';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  selector: 'ym-user-master-app',
  templateUrl: './user-master-app.component.html',
  styleUrls: ['./user-master-app.component.scss']
})
export class UserMasterAppComponent implements OnInit {
  private appConfigObs: Subscription;
  flatTableColumnDef: any[];
  flatTableJson: Object;
  noTableData = false;
  tblResData: any[];
  flatTableData: TreeNode[];
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
        field: 'uId',
        displayName: 'ID',
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
        field: 'name',
        displayName: 'Full Name',
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
        field: 'userName',
        displayName: 'User Name',
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
        field: 'userPassword',
        displayName: 'Password',
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
        field: 'designation',
        displayName: 'Designation',
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
        field: 'mobile',
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
        field: 'avatar',
        displayName: 'Profile Pic',
        format: '',
        width: '180',
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
    this.dataFetchServ.getUserData(req).subscribe(data => {
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

  NewUser() {
    const data = {
      isEdit: false
    };

    const ref = this.dialogService.open(NewUserComponent, {
      data: data,
      header: 'New User',
      contentStyle: { width: '64vw' },
    });

    ref.onClose.subscribe((data: string) => {
      this.getTableData();
    }
    );
  }

  deleteUser(rowData) {
    let req = {
      flag: 'User',
      id: rowData['userID']
    }
    const msg = 'Do you want to delete User';
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.dataFetchServ.deleteUser(req).subscribe(data => {
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

  editUser(rowData) {
    const data = {
      isEdit: true,
      data: rowData,
      table: this.noTableData
    };
    const ref = this.dialogService.open(NewUserComponent, {
      data: data,
      header: 'Update User',
      contentStyle: { width: '64vw' },
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
