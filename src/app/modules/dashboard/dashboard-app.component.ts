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
  cardsJson1 = [];
  cardsJson2 = [];
  showCards = false;
  constructor(
    public libServ: CommonLibService,
    private dataFetchServ: FetchApiDataService,
    private dialogService: DialogService,

  ) { }

  ngOnInit(): void {

    this.cardsJson = [
      {
        field: 'todays_Sales',
        displayName: 'Todays Sales',
        value: 0,
        imageClass: 'fas fa-cart-arrow-down',
        format: 'number',
        config: [],
        color: '#bd94ff'
      },
      {
        field: 'todays_Purchase',
        displayName: 'Todays Purchase',
        value: 0,
        imageClass: 'fas fa-truck',
        format: 'number',
        config: [],
        color: '#7dd4ee'
      },
      {
        field: 'todays_Done',
        displayName: 'Todays Done',
        value: 0,
        imageClass: 'fas fa-check-circle',
        format: 'number',
        config: [],
        color: '#71e071'
      },
      {
        field: 'todays_Cancel',
        displayName: 'Todays Cancel',
        value: 0,
        imageClass: 'fas fa-times-circle',
        format: 'number',
        config: [],
        color: 'red'
      }

    ];

    this.cardsJson1 = [           
      {
        field: 'total_Ready',
        displayName: 'Total Ready',
        value: 0,
        imageClass: 'fas fa-bread-slice',
        format: 'number',
        config: [],
        color: '#FFDC00'
      },
      {
        field: 'total_Pending',
        displayName: 'Total Pending',
        value: 0,
        imageClass: 'fas fa-mitten',
        format: 'number',
        config: [],
        color: '#e27197'
      },
    ];

    this.cardsJson2 = [
      {
        field: 'total_Available_Cake',
        displayName: 'Total Available Cake',
        value: 0,
        imageClass: 'fas fa-birthday-cake',
        format: 'number',
        config: [],
        color: '#0ABF12'
      },
    ];
    this.loadCards();

  }

  loadCards() {
    this.showCards = false;
    this.dataFetchServ.getCardData().subscribe(res => {
      debugger;
      let ProdCategory = [];
      if (!this.libServ.isEmptyObj(res['table'])) {
        this.cardsJson.map(o => {
          o['value'] = res['table'][0][o['field']];
        });

        this.cardsJson1.map(o => {
          o['value'] = res['table'][0][o['field']];
        });

        this.cardsJson2.map(o => {
          o['value'] = res['table'][0][o['field']];
        });

        this.cardsJson[0]['value'] = res['table'][0]['todays_Sales'];
        this.cardsJson[0]['value'] = res['table'][0]['todays_Purchase']; 
        this.cardsJson[0]['value'] = res['table'][0]['total_Done'] ;
        this.cardsJson[0]['value'] = res['table'][0]['total_Cancel'];

        this.cardsJson1[0]['value'] = res['table'][0]['total_Ready'];
        this.cardsJson1[1]['value'] = res['table'][0]['total_Pending'];

        this.cardsJson2[0]['value'] = res['table'][0]['total_Available_Cake'];
      } else {
        this.cardsJson.map(o => {
          o['value'] = 0;
        });

        this.cardsJson1.map(o => {
          o['value'] = 0;
        });

        this.cardsJson2.map(o => {
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
