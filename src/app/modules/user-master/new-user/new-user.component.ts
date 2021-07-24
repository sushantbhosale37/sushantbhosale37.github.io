import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/primeng';
import { ToastService } from 'src/app/_services';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'ym-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [DialogService]
})
export class NewUserComponent implements OnInit {
  yearRange: string;
  formNewRowModel: FormGroup;
  name: string;
  userName: string;
  userPassword: string;
  designation: string;
  mobile: string;
  avatar: string;
  bDate: Date;
  isEdit = false;
  editTableData: Object;
  selectedUserStatus: object;
  UserStatusOptions: any[];
  maxDate = new Date();

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
    this.yearRange = moment().subtract(100, 'year').format('YYYY') + ':' + moment().format('YYYY');

    this.formNewRowModel = this.fb.group({
      name: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      bDate: new FormControl('', Validators.required),
      selectedUserStatus: new FormControl('', Validators.required),
      avatar: new FormControl()
    });
    this.getFilters();
    if (this.isEdit) {
      this.name = this.editTableData['name'];
      this.userName = this.editTableData['userName'];      
      this.userPassword = this.editTableData['userPassword'];
      this.designation = this.editTableData['designation'];
      this.mobile = this.editTableData['mobile'];
      this.avatar = this.editTableData['avatar'];
      this.selectedUserStatus = {
        label: this.editTableData['isActive'],
        key: this.editTableData['isActive']
      }
      this.bDate = this.editTableData['bDate'] == '' ? null : moment(this.editTableData['bDate'], 'DD/MM/YYYY').toDate();
    } 
  }

  get f() {
    return this.formNewRowModel.controls;
  }

  getFilters() {    
    let UserStatus = [];     
    UserStatus.push({ label: 'Active', key: 'Active' });
    UserStatus.push({ label: 'InActive', key: 'InActive' });     
    this.UserStatusOptions = UserStatus;      
}

  submitHandler() {
    const newOderObj = {
      uID: '0',
      name: this.name,
      userName: this.userName,
      userPassword: this.userPassword,
      designation:this.designation,
      mobile: this.mobile,
      avatar: this.avatar,
      isActive: this.selectedUserStatus['key'],
      bDate: this.bDate == null ? '' : moment(this.bDate).format('DD/MM/YYYY'),
      userID: parseInt(localStorage.getItem('uId'))
    };
    if (this.isEdit) {
      newOderObj.uID = this.editTableData['uId'];
      this.dataFetchServ.updateUser(newOderObj).subscribe(res => {        
        this.toastService.displayToast({
          severity: 'info',
          summary: 'Update User',
          detail: 'User updated succesfully',
          life: 10000
        });

        this.dynamicDialogRef.close(null);
      });
    } else {
      this.dataFetchServ.saveUser(newOderObj).subscribe(res => {
        this.toastService.displayToast({
          severity: 'info',
          summary: 'New User',
          detail: 'User added succesfully',
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
