import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItemGroup, ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonLibService } from 'src/app/_services';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/primeng';
@Component({
  selector: 'ym-update-status-form',
  templateUrl: './update-status-form.component.html',
  styleUrls: ['./update-status-form.component.scss']
})
export class UpdateStatusFormComponent implements OnInit {
  // private appConfigObs: Subscription;

  appConfig: object = {};
  formNewRioModel: FormGroup;
  selectedDeliveryStatus: object;
  DeliveryStatusOptions: any[];
  RowData: object = {};
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private dataFetchServ: FetchApiDataService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private libServ: CommonLibService,
    private config: DynamicDialogConfig,
    private dynamicDialogRef: DynamicDialogRef
  ) {
    this.RowData = this.config.data;
  }

  ngOnInit() {

    this.formNewRioModel = this.formBuilder.group({
      selectedDeliveryStatus: ['', [Validators.required]]
    });
    this.DeliveryStatusOptions = [
      { label: 'Ready', key: 'Ready' },
      { label: 'Cancel', key: 'Cancel' }
    ];

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formNewRioModel.controls;
  }

  onSubmit() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to change update status?',
      accept: () => {
        const req = {
          deliveryStatus: this.selectedDeliveryStatus['label'],
          ordID: this.RowData['ordID'],
          userID: parseInt(localStorage.getItem('uId'))
        };
        this.selectedDeliveryStatus['label'] == 'Ready' ? req['prodID'] = this.RowData['prodID'] : '';
        this.dataFetchServ.updateDeliveryStatus(req).subscribe(data => {
          this.toastService.displayToast({
            severity: 'success',
            summary: 'Delivery Status Update',
            detail: 'Delivery Status updated successfully'
          });

          this.dynamicDialogRef.close(null);
        });
      },
      reject: () => {

      }
    });
  }

  goBack() {
    // this.router.navigate(['/users']);
    this.dialogService.dialogComponentRef.destroy();
  }
  // ngOnDestroy() {
  //   if (this.appConfigObs && !this.appConfigObs.closed) {
  //     this.appConfigObs.unsubscribe();
  //   }
  // }
}
