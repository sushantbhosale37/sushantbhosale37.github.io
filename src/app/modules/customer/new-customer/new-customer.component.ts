import { Component, OnInit } from '@angular/core';
import { CommonLibService } from 'src/app/_services';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';
import { FetchApiDataService } from '../fetch-api-data.service';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef, TreeNode, ConfirmationService } from 'primeng/primeng';
import { ExportdataService } from 'src/app/_services/export/exportdata.service';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { ExportRequest } from 'src/app/_interfaces/exportRequest';
import { environment } from 'src/environments/environment';
import { FilterDataService } from '../../../_services/filter-data/filter-data.service';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { DialogService } from 'primeng/primeng';
import { NewFamilyComponent } from './new-family/new-family.component';
// import {ReplaySubject} from "rxjs/ReplaySubject";
// import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ym-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
  providers: [DialogService]
})
export class NewCustomerComponent implements OnInit {
  BASE_URL: string = environment.baseUrl;
  filterUrl: string = this.BASE_URL + '/afar/v1/rio/filter';
  exportRequest: ExportRequest = <ExportRequest>{};
  formNewRioModel: FormGroup;
  CustName: string;
  custBdate: Date;
  anniversaryDate: Date;
  mobile: string;
  address: string;
  pinCode: string;
  selectedCountry: object;
  selectedState: object;
  selectedDistrict: object;
  selectedTaluka: object;

  CountryOptions: any[];
  StateOptions: any[];
  DistrictOptions: any[];
  TalukaOptions: any[];

  editTableData: Object;
  isEdit = false;

  flatTableData: TreeNode[];
  flatTableColumnDef: any[];
  flatTableJson: Object;
  familyData: any[];
  yearRange: string;
  maxDate = new Date();

  constructor(
    private libServ: CommonLibService,
    private formatNumPipe: FormatNumPipe,
    private dataFetchServ: FetchApiDataService,
    private config: DynamicDialogConfig,
    private exportService: ExportdataService,
    private toastService: ToastService,
    private filterDataService: FilterDataService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private dynamicDialogRef: DynamicDialogRef,
    private confirmationService: ConfirmationService,
  ) {
    this.isEdit = this.config.data['isEdit'];

    if (this.isEdit) { this.editTableData = this.config.data['data']; }
  }

  ngOnInit() {
    this.yearRange = moment().subtract(100, 'year').format('YYYY') + ':' + moment().format('YYYY');
    console.log('yearRange', this.yearRange)
    this.familyData = [];
    this.formNewRioModel = this.fb.group({
      CustName: new FormControl('', Validators.required),
      custBdate: new FormControl('', Validators.required),
      anniversaryDate: new FormControl(),
      mobile: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      pinCode: new FormControl('', Validators.required),
      selectedCountry: new FormControl('', Validators.required),
      selectedState: new FormControl('', Validators.required),
      selectedDistrict: new FormControl('', Validators.required),
      selectedTaluka: new FormControl('', Validators.required)
    });

    this.flatTableColumnDef = [
      {
        field: 'fMemberNm',
        displayName: 'Name',
        format: '',
        width: '200',
        isExpanded: 'false',
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
          colSort: true,
          resizable: true,
          movable: false
        }
      },

      {
        field: 'relationship',
        displayName: 'Relationship',
        format: '',
        width: '180',
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
          colSort: true,
          resizable: true,
          movable: false
        }
      },

      {
        field: 'birthDate',
        displayName: 'Birth Date',
        format: '',
        width: '150',
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
          colSort: true,
          resizable: true,
          movable: false
        }
      },
      {
        field: 'mobile',
        displayName: 'Mobile',
        format: '',
        width: '150',
        exportConfig: {
          format: '',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: true,
          resizable: true,
          movable: true
        },
        footerTotal: '-'
      },
      {
        field: 'Update',
        displayName: 'Edit',
        format: '',
        width: '80',
        exportConfig: {
          format: '',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: true,
          resizable: true,
          movable: true
        },
        footerTotal: '-'
      },
      {
        field: 'Delete',
        displayName: 'Delete',
        format: '',
        width: '80',
        exportConfig: {
          format: '',
          styleinfo: {
            thead: 'default',
            tdata: 'white'
          }
        },
        formatConfig: [],
        options: {
          editable: false,
          colSearch: false,
          colSort: true,
          resizable: true,
          movable: true
        },
        footerTotal: '-'
      }
    ];

    this.flatTableJson = {
      page_size: 10,
      page: 1,
      lazy: true,
      loading: false,
      // export: true,
      // sortMode: "multiple",
      resizableColumns: true,
      columnResizeMode: 'fit',
      reorderableColumns: true,
      scrollHeight: '200px',
      totalRecords: 1000,
      columns: this.libServ.deepCopy(this.flatTableColumnDef.slice(1)),
      selectedColumns: this.libServ.deepCopy(this.flatTableColumnDef.slice(1)),
      frozenCols: this.libServ.deepCopy([...this.flatTableColumnDef.slice(0, 1)]),
      frozenWidth:
        this.flatTableColumnDef
          .slice(0, 1)
          .reduce((tot, cur) => tot + parseInt(cur.width, 10), 0) + 'px',
      scrollable: true,
      selectionMode: 'multiple',
      selectedColsModal: [],
      selectionDataKey: 'name',
      metaKeySelection: true,
      showHideCols: true,
      overallSearch: false,
      columnSearch: false
    };


    this.getFilters();


    if (this.isEdit) {
      this.CustName = this.editTableData['custName'];
      this.custBdate = moment(this.editTableData['custBdate'], 'DD/MM/YYYY').toDate();
      this.anniversaryDate = this.editTableData['anniversaryDate'] == '' ? null : moment(this.editTableData['anniversaryDate'], 'DD/MM/YYYY').toDate();
      this.mobile = this.editTableData['custMobile'];
      this.address = this.editTableData['address'];
      this.pinCode = this.editTableData['pinCode'];
      this.selectedCountry = {
        label: this.editTableData['countryName'],
        key: this.editTableData['countryID']
      };
      this.countryChange();
      this.selectedState = {
        label: this.editTableData['stateName'],
        key: this.editTableData['stateID']
      }
      this.stateChange();
      this.selectedDistrict = {
        label: this.editTableData['districtName'],
        key: this.editTableData['districtID']
      }
      this.districtChange();
      this.selectedTaluka = {
        label: this.editTableData['talukaName'],
        key: this.editTableData['talukaID']
      }
      this.familyData = this.editTableData['familyDetails'];
      console.log('editdata', this.editTableData, this.selectedCountry)
      this.getTableData();
    } else {
      this.selectedCountry = {
        label: 'India',
        key: 1
      };
      this.countryChange();

      this.selectedState = {
        label: 'Maharashtra',
        key: 1
      };
      this.stateChange();
    }
  }
  get f() {
    return this.formNewRioModel.controls;
  }



  getFilters() {

    let reqCountry = {
      flag: 'Country',
      Id: 0

    }
    this.dataFetchServ.getFilterValues(reqCountry).subscribe(res => {
      let Country = [];
      res['table'].forEach(element => {
        Country.push({ label: element['countryName'], key: element['countryID'] });
      });
      this.CountryOptions = Country;
    });

  }

  getTableData() {
    this.flatTableJson['loading'] = true;
    const arr = [];
    const fData = this.libServ.deepCopy(this.familyData);
    fData.forEach((r, index) => {
      const obj = {};
      r['index'] = index;
      obj['data'] = r;
      arr.push(obj);
    });
    this.flatTableData = <TreeNode[]>arr;
    this.flatTableJson['totalRecords'] = this.familyData.length;
    this.flatTableJson['loading'] = false;
  }
  NewFamily() {
    const data = {
      isEdit: false
    };

    const ref = this.dialogService.open(NewFamilyComponent, {
      data: data,
      header: 'New Family Details',
      contentStyle: { width: '40vw' },
    });

    ref.onClose.subscribe((data: object) => {
      if (data != null) {
        this.familyData.push(data);
        this.getTableData();
      }
    }
    );

  }

  deleteFamily(rowData) {
    const msg = 'Do you want to delete customer';
    const toastMsg = 'Delete Customer';
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.familyData.splice(rowData['index'], 1);
        this.getTableData();
      },
      reject: () => {

      }
    });
  }

  editFamily(rowData) {
    const data = {
      isEdit: true,
      data: rowData
    };

    const ref = this.dialogService.open(NewFamilyComponent, {
      data: data,
      header: 'Edit Family Details',
      contentStyle: { width: '40vw' },
    });

    ref.onClose.subscribe((data: object) => {
      if (data != null) {
        this.familyData[rowData['index']] = data;
        this.getTableData();
      }
    }
    );
  }
  submitHandler() {
    console.log('familyData', this.familyData)
    const newOderObj = {
      custID: '0',
      custName: this.CustName,
      custMobile: this.mobile,
      custBdate: moment(this.custBdate).format('DD/MM/YYYY'),
      anniversaryDate: this.anniversaryDate == null ? '' : moment(this.anniversaryDate).format('DD/MM/YYYY'),
      address: this.address,
      pinCode: this.pinCode,
      talukaID: this.selectedTaluka['key'],
      districtID: this.selectedDistrict['key'],
      stateID: this.selectedState['key'],
      countryID: this.selectedCountry['key'],
      familyDetails: this.familyData

    };
    if (this.isEdit) {
      newOderObj.custID = this.editTableData['custID'];
      this.dataFetchServ.updateCustomer(newOderObj).subscribe(res => {
        // console.log('status',res['status'])
        // if (res['status']) {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'Update Customer',
          detail: 'Customer updated succesfully',
          life: 10000
        });

        this.dynamicDialogRef.close(null);

        //   }
      });
    } else {
      this.dataFetchServ.saveCustomer(newOderObj).subscribe(res => {
        // console.log('status',res['status'])
        // if (res['status']) {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'New Customer',
          detail: 'Customer added succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
        //   }
      });
    }
  }

  countryChange() {
    let reqState = {
      flag: 'State',
      Id: this.selectedCountry['key']
    };
    this.dataFetchServ.getRelativeFilterValues(reqState).subscribe(res => {
      let State = [];
      res['table'].forEach(element => {
        State.push({ label: element.stateName, key: element.stateID });
      });
      this.StateOptions = State;
    });

  }

  stateChange() {
    let reqDistrict = {
      flag: 'District',
      Id: this.selectedState['key']
    }
    this.dataFetchServ.getRelativeFilterValues(reqDistrict).subscribe(res => {
      let District = [];
      res['table'].forEach(element => {
        District.push({ label: element['districtName'], key: element['districtID'] });
      });
      this.DistrictOptions = District;
    });
  }

  districtChange() {
    let reqTaluka = {
      flag: 'Taluka',
      Id: this.selectedDistrict['key']
    };
    this.dataFetchServ.getRelativeFilterValues(reqTaluka).subscribe(res => {
      let Taluka = [];
      res['table'].forEach(element => {
        Taluka.push({ label: element.talukaName, key: element.talukaID });
      });
      this.TalukaOptions = Taluka;
    });
  }

  goBack() {
    this.dynamicDialogRef.close(null);
  }


  isHiddenColumn(col) { }
}
