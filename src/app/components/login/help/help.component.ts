import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { AuthService } from '../../../_services';

@Component({
  selector: 'ym-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class helpComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}
}
