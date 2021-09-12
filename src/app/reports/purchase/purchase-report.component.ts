import { Component, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { FetchApiDataService } from './fetch-api-data.service';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ym-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.scss']
})
export class PurchaseReportComponent implements OnInit {
  private appConfigObs: Subscription;
  flatTableColumnDef: any[];
  flatTableJson: Object;
  noTableData = false;
  tblResData: any[];
  flatTableData: TreeNode[];
  fromDate: Date;
  toDate: Date;
  todaysDate: Date;
  formNewRioModel: FormGroup;
  isForExport = false;
  rows: any;

  constructor(
    private dataFetchServ: FetchApiDataService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.fromDate = moment().toDate();
    this.toDate = moment().toDate();
    this.todaysDate = moment().toDate();
    this.formNewRioModel = this.fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required)      
    });
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

  get f() {
    return this.formNewRioModel.controls;
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

      const arr1 = [];
      for (const r of resultData) {
        const obj = {};
        obj['receiptNo'] = r['receiptNo'];
        obj['supplierCode'] = r['supplierCode'];
        obj['supplierName'] = r['supplierName'];
        obj['pDate'] = r['pDate'];
        obj['totalAmt'] = r['totalAmt'];
        obj['paymentMode'] = r['paymentMode'];
        arr1.push(obj);
      } 
      this.rows = arr1;
      
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

  submitHandler() {
    const newPurchaseObj = {
      id: null,
      StartDate: moment(this.fromDate).format('DD/MM/YYYY'),
      EndDate: moment(this.toDate).format('DD/MM/YYYY'),
    };
     
      this.dataFetchServ.getPurchaseData(newPurchaseObj).subscribe(res => {
        this.noTableData = false;
      const arr = [];      
      let resultData = res as [];
      for (const r of resultData) {
        const obj = {};
        obj['data'] = r;
        arr.push(obj);
      }
      this.tblResData = arr;

      const arr1 = [];
      for (const r of resultData) {
        const obj = {};
        obj['receiptNo'] = r['receiptNo'];
        obj['supplierCode'] = r['supplierCode'];
        obj['supplierName'] = r['supplierName'];
        obj['pDate'] = r['pDate'];
        obj['totalAmt'] = r['totalAmt'];
        obj['paymentMode'] = r['paymentMode'];
        arr1.push(obj);
      } 
      this.rows = arr1;       
      this.flatTableData = <TreeNode[]>arr;
      this.flatTableJson['totalRecords'] = res['totalItems'];
      this.flatTableJson['loading'] = false;
      setTimeout(() => {
        this.flatTableJson['lazy'] = false;
      }, 0);      
      });    
  }

  clearFilter(){
    this.getTableData();
  }

  ngOnDestroy(): void {
    if (this.appConfigObs && !this.appConfigObs.closed) {
      this.appConfigObs.unsubscribe();
    }
  }

  exportExcel(): void {
    this.isForExport = true;
    this.saveExcelFile();
  }

  private saveExcelFile(): void {
    if(this.isForExport == true){
      const fileName: string = "Purchase_Report_" + moment(this.todaysDate).format('DD_MMM_YYYY') + ".xlsx";
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rows);
    this.changeHeaders(ws);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    XLSX.writeFile(wb,fileName);
      this.isForExport = false;
    }    
  }

  changeHeaders(ws){
    var Heading = [
      ["Receipt No", "Supplier Code", "Supplier Name", "Purchase Date", "Total Amount", "Payment Mode"],
    ];

    XLSX.utils.sheet_add_aoa(ws, Heading);

    var wscols = [
      {wch:16},
      {wch:16},
      {wch:23},
      {wch:13},
      {wch:11},
      {wch:14},
  ];

    ws["!cols"] = wscols;

  }

}
