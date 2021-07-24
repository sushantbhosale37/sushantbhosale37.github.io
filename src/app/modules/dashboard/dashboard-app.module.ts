import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/_pipes/shared.module';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';
import { RouterModule } from '@angular/router';
import { DashboardAppRoutesAppRoutes } from './dashboard-app-routing.module';
import { DashboardAppComponent } from './dashboard-app.component';
import { CardsModule } from '../common/cards/cards.module';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [DashboardAppComponent],
  imports: [
    CommonModule,
    ButtonModule,
    SharedModule,
    FormsModule,
    CardsModule,
    CardModule,
    RouterModule.forChild(DashboardAppRoutesAppRoutes)
  ],
  providers: [FormatNumPipe]
})
export class DashboardAppRoutesAppModule { }
