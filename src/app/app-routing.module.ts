import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components';
import { AppLayoutComponent } from './components/layouts/app-layout/app-layout.component';
import { MainLoginComponent } from './components/main-login/main-login.component';
const routes: Routes = [
  {
    path: 'auth/set-password/:email/:token',
    component: LoginComponent
  },
  {
    path: 'login',
    component: MainLoginComponent
  },
  {
    path: 'admin-login',
    component: LoginComponent
  },
  {
    path: '',
    component: AppLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/dashboard/dashboard-app.module#DashboardAppRoutesAppModule',
        data: {
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard-app.module#DashboardAppRoutesAppModule',
        data: {
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'userMaster',
        loadChildren: './modules/user-master/user-master-app.module#UserMasterAppModule',
        data: {
          breadcrumb: 'userMaster'
        }
      },
      {
        path: 'order',
        loadChildren: './modules/cake-order/cake-order-app.module#CakeOrderAppModule',
        data: {
          breadcrumb: 'Order'
        }
      },
      {
        path: 'customer',
        loadChildren: './modules/customer/customer-app.module#CustomerAppModule',
        data: {
          breadcrumb: 'Customer'
        }
      },
      {
        path: 'supplier',
        loadChildren: './modules/supplier/supplier-app.module#SupplierAppModule',
        data: {
          breadcrumb: 'Supplier'
        }
      },
      {
        path: 'categoryMaster',
        loadChildren: './modules/category-master/category-master-app.module#CategoryMasterAppModule',
        data: {
          breadcrumb: 'categoryMaster'
        }
      },
      {
        path: 'measurementMaster',
        loadChildren: './modules/measurement-master/measurement-master-app.module#MeasurementMasterAppModule',
        data: {
          breadcrumb: 'measurementMaster'
        }
      },
      {
        path: 'cakeShapeMaster',
        loadChildren: './modules/cake-shape-master/cake-shape-master-app.module#CakeShapeMasterAppModule',
        data: {
          breadcrumb: 'cakeShapeMaster'
        }
      },
      {
        path: 'product',
        loadChildren: './modules/product/product-app.module#ProductAppModule',
        data: {
          breadcrumb: 'Product'
        }
      },
      {
        path: 'sales',
        loadChildren: './modules/sales/sales-app.module#SalesAppModule',
        data: {
          breadcrumb: 'Sales'
        }
      },
      {
        path: 'purchase',
        loadChildren: './modules/purchase/purchase-app.module#PurchaseAppModule',
        data: {
          breadcrumb: 'Purchase'
        }
      },
      {
        path: 'salesReport',
        loadChildren: './reports/sales/sales-report.module#SalesReportModule',
        data: {
          breadcrumb: 'Sales'
        }
      },
      {
        path: 'purchaseReport',
        loadChildren: './reports/purchase/purchase-report.module#PurchaseReportModule',
        data: {
          breadcrumb: 'Purchase'
        }
      },
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
