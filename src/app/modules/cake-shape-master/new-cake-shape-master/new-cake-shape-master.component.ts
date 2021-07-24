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
  selector: 'ym-new-cake-shape-master',
  templateUrl: './new-cake-shape-master.component.html',
  styleUrls: ['./new-cake-shape-master.component.scss'],
  providers: [DialogService]
})
export class NewCakeShapeMasterComponent implements OnInit {
  formNewRioModel: FormGroup;
  isEdit = false;
  cakeShape: string;
  selectedCakeShapeStatus: object;
  editTableData: Object;
  CakeShapeStatusOptions: any[];

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
      cakeShape: new FormControl('', Validators.required),
      selectedCakeShapeStatus: new FormControl('', Validators.required),
    });
    this.getFilters();
    if (this.isEdit) {
      this.cakeShape = this.editTableData['cakeShape'];
      this.selectedCakeShapeStatus = {
        label: this.editTableData['isActive'],
        key: this.editTableData['isActive']
      }
    }
  }

  get f() {
    return this.formNewRioModel.controls;
  }

  getFilters() {    
      let CakeShape = [];     
      CakeShape.push({ label: 'Active', key: 'Active' });
      CakeShape.push({ label: 'InActive', key: 'InActive' });     
      this.CakeShapeStatusOptions = CakeShape;      
  }

  submitHandler() {
    const newOderObj = {
      shapeID: 0,
      cakeShape: this.cakeShape,
      isActive: this.selectedCakeShapeStatus['key'],
      userID: parseInt(localStorage.getItem('uId'))
    };
    if (this.isEdit) {
      newOderObj.shapeID = this.editTableData['shapeID'];
      this.dataFetchServ.updateCakeShape(newOderObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'Update Cake Shape',
          detail: 'Cake Shape updated succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    } else {
      this.dataFetchServ.saveCakeShape(newOderObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'New Cake Shape',
          detail: 'Cake Shape added succesfully',
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
