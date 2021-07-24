import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderObsService } from './_services/api-loader/loader-obs.service';
import { ToastService } from './_services/toast-notification/toast.service';
import { MessageService } from 'primeng/api';
import { CommonLibService } from 'src/app/_services/common-lib/common-lib.service';
import { ImpersonateService } from './_services/impersonate/impersonate.service';
import { Subscription } from 'rxjs';
import { PlatformConfigService } from './_services';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ym-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cp-soft-tech';
  displayLoader = false;
  impersonated = false;
  imperSubscription: Subscription;
  enableRouter = false;

  constructor(
    private libServ: CommonLibService,
    private loaderService: LoaderObsService,
    private impersonateServ: ImpersonateService,
    private platformConfigService: PlatformConfigService,
    private toastService: ToastService,
    private messageService: MessageService,
    private router: Router
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!localStorage.getItem('token') && (event.url.includes("auth/set-password/") || event.url.includes("login/forgot-password"))) {
          console.log("url includes forgot pwd or set pwd");
        }
        else if (!localStorage.getItem('token') && !event.url.includes("login")) {
          localStorage.clear();
          router.navigate(["/login"]);
        }
      }
    });
  }

  ngOnInit() {

    this.loaderService.displayLoader.subscribe(visibility => {
      setTimeout(() => {
        this.displayLoader = visibility;
      }, 0);
    });

    this.toastService.showToastToggle$.subscribe(obj => {
      if (!this.libServ.isEmptyObj(obj)) {
        this.messageService.add(obj);
      }
    });
  }


  ngOnDestroy() {
    if (this.imperSubscription && this.imperSubscription.closed) {
      this.imperSubscription.unsubscribe();
      this.toastService.showToastToggle$.unsubscribe();
    }
  }
}
