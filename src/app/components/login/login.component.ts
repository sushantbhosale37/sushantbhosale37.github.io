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
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ImpersonateService } from 'src/app/_services/impersonate/impersonate.service';
import { Title } from '@angular/platform-browser';
import { helpComponent } from './help/help.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
    if (this.dialogService.dialogComponentRef) {
      this.dialogService.dialogComponentRef.destroy();
    }
    this._titleService.setTitle('Cake Art | CP Soft-Tech');
  }

  onLogin(): void {
    // this.impersonateServ.stopImpersonate(); // Useful If impersonated and session timed-out
    this._loadingBar.start();
    const req = {
      UserName: this.model['email'],
      Password: this.model['password'],
      grant_type: 'password'
    };
    this.authService.login(req).then(
      response => {
        if (response['access_token']) {
          this._loadingBar.complete();
          // let reqUser = {
          //   uId: response['UID']
          // }
          // this.platformConfigService.getUserDetails(reqUser).then(userData => {
          //   if (userData != undefined) {
          //     this.platformConfigService.getPlatformConfigInfoData(userData[0]).then(data => {
                this.router.navigate(['/']);
          //     });
          //   }
          // });
        } else {
          this.toastService.displayToast({
            severity: 'error',
            summary: 'Incorrect',
            detail: 'Email or Password incorrect'
          });
          localStorage.removeItem('token');
          this._loadingBar.complete();
        }
      },
      error => {
        console.log('error', error);
        this.toastService.displayToast({
          severity: 'error',
          summary: 'Incorrect',
          detail: error.error['message']
        });
        localStorage.removeItem('token');
        this._loadingBar.complete();

      }
    )
      .catch(err => {
        console.log('err', err);
        this.toastService.displayToast({
          severity: 'error',
          summary: 'Incorrect',
          detail: 'Email or Password incorrect'
        });
        localStorage.removeItem('token');
        this._loadingBar.complete();
      });
  }

  togglePassword(pass: string) {
    this.showPassword[pass] = !this.showPassword[pass];
  }

  forgotPassword() {
    const ref = this.dialogService.open(ForgotPasswordComponent, {
      header: 'Forgot Password',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: this.model
    });
    ref.onClose.subscribe((data1: string) => { });
  }

  getHelpPopup() {
    const ref = this.dialogService.open(helpComponent, {
      header: 'Help',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
    });
    ref.onClose.subscribe((data1: string) => { });
  }

  termsPopup() {
    const ref = this.dialogService.open(TermsConditionsComponent, {
      header: 'Terms and Conditions',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: this.model
    });
    ref.onClose.subscribe((data1: string) => { });
  }
}
