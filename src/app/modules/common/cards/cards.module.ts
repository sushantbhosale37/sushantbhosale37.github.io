import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CardsComponent } from './cards.component';
import { SharedModule } from '../../../_pipes/shared.module';
@NgModule({
  declarations: [CardsComponent],
  imports: [CommonModule, SharedModule, CardModule],
  exports: [CardsComponent]
})
export class CardsModule {}
