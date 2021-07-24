import { Component, OnInit } from '@angular/core';
import { CommonLibService } from 'src/app/_services';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';
import { FetchApiDataService } from '../../fetch-api-data.service';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef, TreeNode } from 'primeng/primeng';
import { ExportdataService } from 'src/app/_services/export/exportdata.service';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { ExportRequest } from 'src/app/_interfaces/exportRequest';
import { environment } from 'src/environments/environment';
import { FilterDataService } from '../../../../_services/filter-data/filter-data.service';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { DialogService } from 'primeng/primeng';
// import {ReplaySubject} from "rxjs/ReplaySubject";
// import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ym-new-family',
  templateUrl: './new-family.component.html',
  styleUrls: ['./new-family.component.scss']
})
export class NewFamilyComponent implements OnInit {
  exportRequest: ExportRequest = <ExportRequest>{};
  formNewRioModel: FormGroup;
  fMemberNm: string;
  birthDate: Date;
  mobile: string;
  selectedRelationship: object;

  RelationshipOptions: any[];
  yearRange: string;
  maxDate = new Date();
  editTableData: Object;
  isEdit = false;

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
    private dynamicDialogRef: DynamicDialogRef
  ) {
    this.isEdit = this.config.data['isEdit'];

    if (this.isEdit) { this.editTableData = this.config.data['data']; }
  }

  ngOnInit() {
    this.yearRange = moment().subtract(100, 'year').format('YYYY') + ':' + moment().format('YYYY');
    this.formNewRioModel = this.fb.group({
      fMemberNm: new FormControl(),
      selectedRelationship: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      mobile: new FormControl(''),
    });

    this.RelationshipOptions = [
      { label: 'Mother', key: 'Mother' },
      { label: 'Father', key: 'Father' },
      { label: 'Husband', key: 'Husband' },
      { label: 'Wife', key: 'Wife' },
      { label: 'Uncle', key: 'Uncle' },
      { label: 'Aunt', key: 'Aunt' },
      { label: 'Son', key: 'Son' },
      { label: 'Daughter', key: 'Daughter' },
      { label: 'Brother', key: 'Brother' },
      { label: 'Sister', key: 'Sister' },
      { label: 'Grandfather', key: 'Grandfather' },
      { label: 'Grandmother', key: 'Grandmother' }

    ];
    if (this.isEdit) {
      this.fMemberNm = this.editTableData['fMemberNm'];
      this.birthDate = moment(this.editTableData['birthDate'],'DD/MM/YYYY').toDate();
      this.mobile = this.editTableData['mobile'];
      this.selectedRelationship = {
        label: this.editTableData['relationship'],
        key: this.editTableData['relationship']
      }
    }
  }
  get f() {
    return this.formNewRioModel.controls;
  }

  submitHandler() {
    const newOderObj = {
      fMemberNm: this.fMemberNm,
      mobile: this.mobile,
      birthDate: moment(this.birthDate).format('DD/MM/YYYY'),
      relationship: this.selectedRelationship['label'],
    };
    this.dynamicDialogRef.close(newOderObj);
  }

  goBack() {
    this.dialogService.dialogComponentRef.destroy();
  }

  // prettify(str) {
  //   return str.replace(/(?:_| |\b)(\w)/g, function ($1) {
  //     return $1.toUpperCase().replace('_', ' ');
  //   });
  // }

  isHiddenColumn(col) { }
}
