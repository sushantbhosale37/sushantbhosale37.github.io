import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { AuthService } from '../../../_services';

@Component({
  selector: 'ym-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: String;
  userform: FormGroup;
  model: object = {};

  userEmail: string;
  result: object;
  token: String;
  newPassword: string;
  confirmPassword: string;
  showPassword: object = {
    new: false,
    confirm: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.token = this.config.data['token'];
    this.userEmail = this.config.data['email'];
  }

  ngOnInit() {
    if (typeof this.token !== 'undefined') {
      this.userform = this.fb.group({
        newpassword: new FormControl('', Validators.required),
        confirmpassword: new FormControl('', Validators.required)
      });
    } else {
      this.userform = this.fb.group({
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            )
          ])
        )
      });
    }
  }

  onForgot(value) {
    const userInfo = {
      email: value['email']
    };
    this.authService.setForgotPassword(userInfo).subscribe(
      res => {
        const data = res as {};
        if (data['status']) {
          this.toastService.displayToast({
            severity: 'success',
            summary: 'Forgot password',
            detail: 'Reset Password link sent successfully'
          });
          this.ref.close(null);
        } else {
          this.toastService.displayToast({
            severity: 'error',
            summary: '',
            detail: 'Email not registered, Please enter valid email.'
          });
        }
      },
      error => {
        this.toastService.displayToast({
          severity: 'error',
          summary: 'Something went wrong',
          detail: 'Please refresh page if problem persist contact us'
        });
        this.ref.close(null);
      }
    );
  }

  togglePassword(pass: string) {
    this.showPassword[pass] = !this.showPassword[pass];
  }

  onSetNewPassword() {
    if (this.model['newPassword'] === this.model['confirmPassword']) {
      const req = {
        email: this.userEmail,
        newPassword: this.model['newPassword'],
        confirmPassword: this.model['confirmPassword'],
        forgotPasswordToken: this.token
      };

      this.authService.setForgotPassword(req).subscribe(res => {
        this.result = res;
        if (this.result['status']) {
          this.toastService.displayToast({
            severity: 'success',
            summary: 'Update successful',
            detail: 'Password updated successfully'
          });
          this.ref.close(null);
          setTimeout(() => {
            localStorage.clear();
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.toastService.displayToast({
            severity: 'error',
            summary: 'Something went wrong',
            detail: res['message']
          });
          this.ref.close(null);
        }
      });
    }
  }

  validateField(confirmControl: AbstractControl, newControl: AbstractControl) {
    if (confirmControl.value) {
      if (confirmControl.value != newControl.value) {
        confirmControl.setErrors({ 'missMatch': true });
      }
      if (confirmControl.value == newControl.value) {
        confirmControl.clearValidators();
        confirmControl.updateValueAndValidity();
      }
    }

  }

}
