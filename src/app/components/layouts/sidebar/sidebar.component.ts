import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  PlatformConfigService,
  CommonLibService
} from '../../../_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() public childEvent = new EventEmitter();
  @Input() public expanded: boolean;

  config: object = {};

  isActive = false;
  showMenu = 0;
  show = false;
  showSidenavTitle = true;
  sidenavWidth = this.expanded ? 16 : 4.3;
  val = 1;
  appGroups: any[];
  private platConfigObs: Subscription;
  roles: boolean;
  appGroups2: any;


  constructor(
    private auth: AuthService,
    private router: Router,
    private platformConfigService: PlatformConfigService,
    public libServ: CommonLibService,
    // private navService: NavService
  ) {
    this.roles = localStorage.getItem('roles') == 'Admin' ? true : false;
  }

  ngOnInit() {
    this.appGroups = [];
    this.appGroups = [
      {
        id: 1,
        name: "Dashboard",
        index: 1,
        apps: [{
          name: 'Dashboard',
          route: '/dashboard',
          iconClass: 'fas fa-tachometer-alt'
        }
      ]
      },
        {
      id: 2,
      name: "Master",
      index: 2,
      apps: [
        // {
        //   name: 'Dashboard',
        //   route: '/dashboard',
        //   iconClass: 'fas fa-sign-out-alt'
        // },
        {
          name: 'Category',
          route: '/categoryMaster',
          iconClass: 'fas fa-box-open'
        },
        {
          name: 'Measurement',
          route: '/measurementMaster',
          iconClass: 'fas fa-weight-hanging'
        },
        {
          name: 'Cake Shape',
          route: '/cakeShapeMaster',
          iconClass: 'fas fa-hockey-puck'
        },
        {
          name: 'Customer',
          route: '/customer',
          iconClass: 'fas fa-users'
        },
        {
          name: 'Supplier',
          route: '/supplier',
          iconClass: 'fas fa-truck'
        },
        {
          name: 'Product',
          route: '/product',
          iconClass: 'fab fa-bitbucket'
        }, 
        
      ]
    },
    {
      id: 3,
      name: "Transaction",
      index: 3,
      apps: [{
        name: 'Order',
        route: '/order',
        iconClass: 'fas fa-birthday-cake'
      },
      {
        name: 'Sales',
        route: '/sales',
        iconClass: 'fab fa-stripe-s'
      },
      {
        name: 'Purchase',
        route: '/purchase',
        iconClass: 'fas fa-parking'
      }]
    },
    {
      id: 4,
      name: "Reports",
      index: 4,
      apps: [
        {
        name: 'Sales',
        route: '/salesReport',
        iconClass: 'fab fa-stripe-s'
      },
      {
        name: 'Purchase',
        route: '/purchaseReport',
        iconClass: 'fas fa-parking'
      },
    ]
    }
  ]

    if (this.roles) {
    let userappgroup = {
      id: this.appGroups.length + 1,
      name: "User Management",
      index: this.appGroups.length + 1,
      apps: [{
        name: 'User',
        route: '/userMaster',
        iconClass: 'fas fa-users'
      }]
    }
    this.appGroups.push(userappgroup);
    }

    this.platConfigObs = this.platformConfigService.obsConfig.subscribe(res => {
      if (!this.libServ.isEmptyObj(res)) {
        console.log('res', res);
        this.config = res;
      }
    });
    this.childEvent.emit(this.sidenavWidth);
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  toggleExpand(expanded: boolean): void {
    this.show = expanded;

    if (this.show) {
      this.sidenavWidth = 16;
      this.showSidenavTitle = true;
    } else {
      this.sidenavWidth = 4.3;
      this.showSidenavTitle = false;
    }
    this.childEvent.emit(this.sidenavWidth);
  }

  logout(evt): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.val) {
      this.val = -1;
    } else {
      this.val = element;
    }
  }

  ngOnDestroy(): void {
    if (this.platConfigObs && !this.platConfigObs.closed) {
      this.platConfigObs.unsubscribe();
    }
  }

  preventPropogation(event) {
    let prevent = false;
    event.path.some(ele => {
      if (typeof ele.classList !== 'undefined' && ele.classList.length) {
        if (ele.classList.contains('router-link-active')) {
          prevent = true;
          return true;
        } else {
          return false;
        }
      }
    });
    if (prevent) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
