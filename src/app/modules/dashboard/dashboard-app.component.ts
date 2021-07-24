import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchApiDataService } from '../dashboard/fetch-api-data.service';
import { CommonLibService } from 'src/app/_services';
import { Subscription } from 'rxjs';
import { NewCustomerComponent } from '../customer/new-customer/new-customer.component';
import { DialogService } from 'primeng/api';
import { NewProductComponent } from '../product/new-product/new-product.component';
import { NewCakeOrderComponent } from '../cake-order/new-cake-order/new-cake-order.component';
import { NewSalesComponent } from '../sales/new-sales/new-sales.component';

@Component({
  selector: 'ym-dashboard-app',
  templateUrl: './dashboard-app.component.html',
  styleUrls: ['./dashboard-app.component.scss']
})
export class DashboardAppComponent implements OnInit, OnDestroy {
  private appConfigObs: Subscription;
  noTableData = false;
  columns: object[];
  filtersApplied: object = {};
  appConfig: object = {};
  cardsJson = [];
  showCards = false;
  constructor(
    public libServ: CommonLibService,
    private dataFetchServ: FetchApiDataService,
    private dialogService: DialogService,

  ) { }

  ngOnInit(): void {

    this.cardsJson = [
      {
        field: 'total_Customer',
        displayName: 'Total Customer',
        value: 0,
        imageClass: 'fas fa-eye',
        format: 'number',
        config: [],
        color: '#bd94ff'
      },
      {
        field: 'total_Product',
        displayName: 'Total Product',
        value: 0,
        imageClass: 'fas fa-eye',
        format: 'number',
        config: [],
        color: '#7dd4ee'
      },
      {
        field: 'total_Sale_TRN',
        displayName: 'Total Sales Transaction',
        value: 0,
        imageClass: 'fas fa-eye',
        format: 'number',
        config: [],
        color: '#71e071'
      },
      {
        field: 'total_advOrder',
        displayName: 'Total Order',
        value: 0,
        imageClass: 'fas fa-hand-holding-usd',
        format: 'number',
        config: [],
        color: '#ffa500'
      },
      {
        field: 'total_Done',
        displayName: 'Total Done Order',
        value: 0,
        imageClass: 'fas fa-dollar-sign',
        format: 'number',
        config: [],
        color: '#e27197'
      },
      {
        field: 'total_Ready',
        displayName: 'Total Ready Order',
        value: 0,
        imageClass: 'fas fa-percent',
        format: 'number',
        config: [2],
        color: '#FFDC00'
      },
      {
        field: 'total_Pending',
        displayName: 'Total Pending Order',
        value: 0,
        imageClass: 'fas fa-funnel-dollar',
        format: 'number',
        config: [],
        color: '#8094f2'
      },
      {
        field: 'total_Cancel',
        displayName: 'Total Cancel Order',
        value: 0,
        imageClass: 'fas fa-file-invoice-dollar',
        format: 'number',
        config: [],
        color: '#f28a9d'
      },

    ];
    this.loadCards();

  }

  loadCards() {
    this.showCards = false;
    this.dataFetchServ.getCardData().subscribe(res => {
      let ProdCategory = [];
      if (!this.libServ.isEmptyObj(res['table'])) {
        this.cardsJson.map(o => {
          o['value'] = res['table'][0][o['field']];
        });
        this.cardsJson[3]['value'] = res['table'][0]['total_Done'] + res['table'][0]['total_Ready'] + res['table'][0]['total_Pending'] + res['table'][0]['total_Cancel']
      } else {
        this.cardsJson.map(o => {
          o['value'] = 0;
        });
      }
      this.showCards = true;
    });
  }

  NewCustomer() {
    const data = {
      isEdit: false
    };

    const ref = this.dialogService.open(NewCustomerComponent, {
      data: data,
      header: 'New Customer',
      contentStyle: { width: '75vw' },
    });

    ref.onClose.subscribe((data: string) => {
      this.loadCards();
    }
    );
  }


  NewProduct() {
    const data = {
      isEdit: false
    };

    const ref = this.dialogService.open(NewProductComponent, {
      data: data,
      header: 'New Product',
      contentStyle: { width: '50vw' },
    });

    ref.onClose.subscribe((data: string) => {
      this.loadCards();
    }
    );
  }

  NewCakeOrder() {
    const data = {
      isEdit: false
    };

    const ref = this.dialogService.open(NewCakeOrderComponent, {
      data: data,
      header: 'New Cake Order',
      contentStyle: { width: '75vw' },
    });

    ref.onClose.subscribe((data: string) => {
      this.loadCards();
    }
    );
  }

  NewSales() {
    const data = {
      isEdit: false
    };

    const ref = this.dialogService.open(NewSalesComponent, {
      data: data,
      header: 'New Sales',
      contentStyle: { width: '75vw' },
    });

    ref.onClose.subscribe((data: string) => {
      this.loadCards();
    }
    );
  }


  ngOnDestroy(): void {

    if (this.appConfigObs && !this.appConfigObs.closed) {
      this.appConfigObs.unsubscribe();
    }
  }
}
