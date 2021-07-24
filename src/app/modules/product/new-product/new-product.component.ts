import { Component, OnInit } from '@angular/core';
import { CommonLibService } from 'src/app/_services';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';
import { FetchApiDataService } from '../fetch-api-data.service';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/primeng';
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

@Component({
  selector: 'ym-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [DialogService]
})
export class NewProductComponent implements OnInit {
  BASE_URL: string = environment.baseUrl;
  filterUrl: string = this.BASE_URL + '/afar/v1/rio/filter';
  exportRequest: ExportRequest = <ExportRequest>{};
  formNewRioModel: FormGroup;
  prodName: string;
  selectedProdCategory: object;
  selectedProdMeasure: object;
  prodQty: string;
  prodRate: string;
  prodDescription: string;
  prodCategoryOptions: any[];
  ProdMeasureOptions: any[];

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
    this.formNewRioModel = this.fb.group({
      prodName: new FormControl('', Validators.required),
      selectedProdCategory: new FormControl('', Validators.required),
      selectedProdMeasure: new FormControl('', Validators.required),
      prodQty: new FormControl('', Validators.required),
      prodRate: new FormControl('', Validators.required),
      prodDescription: new FormControl()
    });
    this.getFilters();
    if (this.isEdit) {
      this.prodName = this.editTableData['prodName'];
      this.prodQty = this.editTableData['prodQty'];
      this.prodRate = this.editTableData['prodRate'];
      this.prodDescription = this.editTableData['prodDescription'];
      this.selectedProdCategory = {
        label: this.editTableData['categoryName'],
        key: this.editTableData['prodCategoryID']
      }
      this.selectedProdMeasure = {
        label: this.editTableData['measureType'],
        key: this.editTableData['prodMeasureID']
      }
    }
  }
  get f() {
    return this.formNewRioModel.controls;
  }

  getFilters() {
    let reqProdCategory = {
      flag: 'Category',
      Id: 0
    }
    this.dataFetchServ.getFilterValues(reqProdCategory).subscribe(res => {
      let ProdCategory = [];
      res['table'].forEach(element => {
        ProdCategory.push({ label: element['categoryName'], key: element['catID'] });
      });
      this.prodCategoryOptions = ProdCategory;

    });

    let reqProdMeasure = {
      flag: 'Measurement',
      Id: 0
    };
    this.dataFetchServ.getFilterValues(reqProdMeasure).subscribe(res => {
      let ProdMeasure = [];
      res['table'].forEach(element => {
        ProdMeasure.push({ label: element.measureType, key: element.measureID });
      });
      this.ProdMeasureOptions = ProdMeasure;
    });
  }

  submitHandler() {
    const newOderObj = {
      prodID: 0,
      prodName: this.prodName,
      prodCategoryID: this.selectedProdCategory['key'],
      prodMeasureID: this.selectedProdMeasure['key'],
      prodQty: this.prodQty,
      prodRate: this.prodRate,
      prodDescription: this.prodDescription,
      userID: parseInt(localStorage.getItem('uId'))
    };
    if (this.isEdit) {
      newOderObj.prodID = this.editTableData['prodID'];
      this.dataFetchServ.updateProduct(newOderObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'Update Product',
          detail: 'Product updated succesfully',
          life: 10000
        });
        this.dynamicDialogRef.close(null);
      });
    } else {
      this.dataFetchServ.saveProduct(newOderObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'New Product',
          detail: 'Product added succesfully',
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
