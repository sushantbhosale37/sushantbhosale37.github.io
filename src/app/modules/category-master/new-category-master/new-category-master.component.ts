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
  selector: 'ym-new-category-master',
  templateUrl: './new-category-master.component.html',
  styleUrls: ['./new-category-master.component.scss'],
  providers: [DialogService]
})
export class NewCategoryMasterComponent implements OnInit {
  formNewRioModel: FormGroup;
  isEdit = false;
  categoryName: string;
  selectedCategoryStatus: object;
  editTableData: Object;
  CategoryStatusOptions: any[];
  
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
      categoryName: new FormControl('', Validators.required),
      selectedCategoryStatus: new FormControl('', Validators.required),
    });
    this.getFilters();
    if (this.isEdit) {
      this.categoryName = this.editTableData['categoryName'];
      this.selectedCategoryStatus = {
        label: this.editTableData['isActive'],
        key: this.editTableData['isActive']
      }
    }
  }

  get f() {
    return this.formNewRioModel.controls;
  }

  getFilters() {    
      let ProdCategory = [];     
        ProdCategory.push({ label: 'Active', key: 'Active' });
        ProdCategory.push({ label: 'InActive', key: 'InActive' });     
      this.CategoryStatusOptions = ProdCategory;      
  }

  submitHandler() {
    const newOderObj = {
      catID: 0,
      categoryName: this.categoryName,
      isActive: this.selectedCategoryStatus['key'],
      userID: parseInt(localStorage.getItem('uId'))
    };
    if (this.isEdit) {
      newOderObj.catID = this.editTableData['catID'];
      this.dataFetchServ.updateCategory(newOderObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'Update Category',
          detail: 'Category updated succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    } else {
      this.dataFetchServ.saveCategory(newOderObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'New Category',
          detail: 'Category added succesfully',
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
