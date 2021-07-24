import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AuthService,
  UsersService,
  PlatformConfigService
} from '../../_services';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { LoaderObsService } from 'src/app/_services/api-loader/loader-obs.service';
import { DialogService } from 'primeng/api';
import { ImpersonateService } from 'src/app/_services/impersonate/impersonate.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css']
})
export class MainLoginComponent {
  model: any = {};
  returnUrl: string;
  showPassword: object = {
    new: false,
    confirm: false
  };
  newUser = false;

  result: object;
  userEmail: string;
  token: String;

  constructor(
    private authService: AuthService,
    private platformConfigService: PlatformConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private impersonateServ: ImpersonateService,
    private _loadingBar: LoaderObsService,
    private userService: UsersService,
    private toastService: ToastService,
    private dialogService: DialogService,
    private _titleService: Title,
  ) {
    // if (this.dialogService.dialogComponentRef) {
    //   this.dialogService.dialogComponentRef.destroy();
    // }

    this._titleService.setTitle('Cake Art | CP Soft-Tech');
  }

  onLogin(): void {

  }

  adminLogin(){
    this.router.navigate(['/admin-login']);
  }

  togglePassword(pass: string) {
    this.showPassword[pass] = !this.showPassword[pass];
  }
}
