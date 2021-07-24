import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FetchApiDataService } from 'src/app/reports/sales/fetch-api-data.service';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ym-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  @ViewChild('content') content: ElementRef;  
  private appConfigObs: Subscription;
  noTableData = false;
  tblResData: any[];
  flatTableJson: Object;
  flatTableData: TreeNode[];
  flatTableColumnDef: any[];
  fromDate: Date;
  toDate: Date;
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
    this.formNewRioModel = this.fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required)      
    });
    this.initialLoading();
    this.flatTableColumnDef = [
      {
        field: 'billNo',
        displayName: 'Bill No',
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
        field: 'salesDate',
        displayName: 'Date',
        format: '',
        width: '90',
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
        field: 'discountAmt',
        displayName: 'Discount',
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
        width: '90',
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

      const arr1 = [];
      for (const r of resultData) {
        const obj = {};
        obj['billNo'] = r['billNo'];
        obj['custName'] = r['custName'];
        obj['salesDate'] = r['salesDate'];
        obj['netAmt'] = r['netAmt'];
        obj['deliveryCharges'] = r['deliveryCharges'];
        obj['discountAmt'] = r['discountAmt'];
        obj['totalAmt'] = r['totalAmt'];
        obj['paymentMode'] = r['paymentMode'];
        obj['advPayment'] = r['advPayment'];
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

  clearFilter(){
    this.getTableData();
  }

  submitHandler() {
    const newSalesObj = {
      id: null,
      StartDate: moment(this.fromDate).format('DD/MM/YYYY'),
      EndDate: moment(this.toDate).format('DD/MM/YYYY'),
    };
     
      this.dataFetchServ.getSalesData(newSalesObj).subscribe(res => {
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
        obj['billNo'] = r['billNo'];
        obj['custName'] = r['custName'];
        obj['salesDate'] = r['salesDate'];
        obj['netAmt'] = r['netAmt'];
        obj['deliveryCharges'] = r['deliveryCharges'];
        obj['discountAmt'] = r['discountAmt'];
        obj['totalAmt'] = r['totalAmt'];
        obj['paymentMode'] = r['paymentMode'];
        obj['advPayment'] = r['advPayment'];
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
      const fileName: string = "Sales_Report.xlsx";
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rows);
    this.changeHeaders(ws);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    XLSX.writeFile(wb,fileName);
      this.isForExport = false;
    }    
  }

  public SavePDF(): void {  
    // let content=this.content.nativeElement;  
    // let doc = new jsPDF();  
    // let _elementHandlers =  
    // {  
    //   '#editor':function(element,renderer){  
    //     return true;  
    //   }  
    // };  
    // doc.fromHTML(content.innerHTML,15,15,{  
  
    //   'width':190,  
    //   'elementHandlers':_elementHandlers  
    // });  
  
    // doc.save('test.pdf');  
  } 
  // exportPdf(): void {
  //   this.isForExport = true;
  //   this.savePdfFile();
  // }

  // private savePdfFile(): void {
  //   const pdfTemplate = require('pdf-template')
 
  //   pdfTemplate({
  //     template: 'example.pdf',
  //     output: 'output.pdf',
  //     data: this.rows
  //   }).then((res) => {
  //     console.log(res)
  //   }).catch((err) => {
  //     console.error(err)
  //   })
  //   this.isForExport = false;
  // }

  changeHeaders(ws){
    var Heading = [
      ["Bill No", "Customer Name", "Sales Date", "Net Amount", "Delivery Charges", "Discount Amount", "Total Amount", "Payment Mode", "Advance Payment"],
    ];

    XLSX.utils.sheet_add_aoa(ws, Heading);

    var wscols = [
      {wch:11},
      {wch:18},
      {wch:11},
      {wch:11},
      {wch:14},
      {wch:14},
      {wch:11},
      {wch:14},
      {wch:15},
  ];

    ws["!cols"] = wscols;

   
  }

}
