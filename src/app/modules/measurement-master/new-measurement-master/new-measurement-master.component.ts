import { Component, OnInit } from '@angular/core';
import {  
  Validators,
  FormControl,
  FormGroup,
  FormBuilder } from '@angular/forms';
  import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/primeng';

@Component({
  selector: 'ym-new-measurement-master',
  templateUrl: './new-measurement-master.component.html',
  styleUrls: ['./new-measurement-master.component.scss'],
  providers: [DialogService]
})
export class NewMeasurementMasterComponent implements OnInit {
  formNewRioModel: FormGroup;
  isEdit = false;
  measureType: string;
  selectedMeasurementStatus: object;
  editTableData: Object;
  MeasurementStatusOptions: any[];

  constructor(
    private fb: FormBuilder,
    private dataFetchServ: FetchApiDataService,
    private toastService: ToastService,
    private dynamicDialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) { 
    this.isEdit = this.config.data['isEdit'];

    if (this.isEdit) { this.editTableData = this.config.data['data']; }
  }

  ngOnInit() {
    this.formNewRioModel = this.fb.group({
      measureType: new FormControl('', Validators.required),
      selectedMeasurementStatus: new FormControl('', Validators.required),
    });
    this.getFilters();
    if (this.isEdit) {
      this.measureType = this.editTableData['measureType'];
      this.selectedMeasurementStatus = {
        label: this.editTableData['isActive'],
        key: this.editTableData['isActive']
      }
    }
  }

  get f() {
    return this.formNewRioModel.controls;
  }

  getFilters() {    
      let ProdMeasurement = [];     
      ProdMeasurement.push({ label: 'Active', key: 'Active' });
      ProdMeasurement.push({ label: 'InActive', key: 'InActive' });     
      this.MeasurementStatusOptions = ProdMeasurement;      
  }

  submitHandler() {
    const newOderObj = {
      measureID: 0,
      measureType: this.measureType,
      isActive: this.selectedMeasurementStatus['key'],
      userID: parseInt(localStorage.getItem('uId'))
    };
    if (this.isEdit) {
      newOderObj.measureID = this.editTableData['measureID'];
      this.dataFetchServ.updateMeasurement(newOderObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'Update Measurement',
          detail: 'Measurement updated succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    } else {
      this.dataFetchServ.saveMeasurement(newOderObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'New Measurement',
          detail: 'Measurement added succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    }
  }
  
  goBack() {
    this.dynamicDialogRef.close(null);
  }

}
