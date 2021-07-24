import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SaveQueryService } from 'src/app/_services/save-query/save-query.service';
import * as moment from 'moment';
import { CommonLibService } from 'src/app/_services/common-lib/common-lib.service';
import { ToastService } from 'src/app/_services/toast-notification/toast.service';

@Component({
  selector: 'ym-daterange-picker',
  templateUrl: './daterange-picker.component.html',
  styleUrls: ['./daterange-picker.component.scss']
})
export class DaterangePickerComponent implements OnInit {
  @Input('appConfig') public appConfig;
  @Output() datePickerChanged = new EventEmitter<Date[]>();

  config: object = {};
  rangeDates: Date[];
  today = new Date();
  minDate = new Date();
  newStartDate : Date;
  newEndDate : Date;

  constructor(
    private saveQueryService: SaveQueryService,
    public libServ: CommonLibService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    if (this.appConfig['filter']['filterConfig']['saveView']) {
      this.saveQueryService.selectedQuery.subscribe(query => {
        if (!this.libServ.isEmptyObj(query)) {
          setTimeout(() => {
            this.config = query['date_filter_config'];
            this.updateDate();
          }, 0);
        }
      });
    } else {
      setTimeout(() => {
        this.config = this.appConfig['filter']['filterConfig']['filters'][
          'datePeriod'
        ][0];
        this.updateDate();
      }, 0);
    }
  }

  updateDate() {
    let startDate;
    let endDate;
    this.minDate = moment(this.config['minDate'], 'YYYYMMDD').toDate();

    if ((this.config['defaultDate'][0]['value'] === 0 && this.config['defaultDate'][0]['period'] === 'month') && (moment().format('DD') === '01' || moment().format('DD') === '02')) {
      startDate = moment().subtract(1, 'months').startOf('month');
      endDate = moment().subtract(1, 'months').endOf('month');
    } else {
      if (this.config['defaultDate'][0]['startOf']) {
        startDate = moment()
          .subtract(
            this.config['defaultDate'][0]['value'],
            this.config['defaultDate'][0]['period']
          )
          .startOf(this.config['defaultDate'][0]['period']);
      } else {
        startDate = moment().subtract(
          this.config['defaultDate'][0]['value'],
          this.config['defaultDate'][0]['period']
        );
      }

      endDate = moment().subtract(
        this.config['defaultDate'][1]['value'],
        this.config['defaultDate'][1]['period']
      );
    }

    if (this.config['filterType'] === 'single_date') {
      this.rangeDates = [startDate.toDate()];
    } else if (this.config['filterType'] === 'date_range') {
      this.rangeDates = [startDate.toDate(), endDate.toDate()];
    } else if (this.config['filterType'] === 'single_month') {
      this.rangeDates = [startDate.toDate()];
    } else if (this.config['filterType'] === 'month_range') {
      this.rangeDates = [startDate.toDate(), endDate.toDate()];
      this.newStartDate = this.rangeDates[0];
      this.newEndDate = this.rangeDates[1];      
    }
  }

  changeDate(period: string) {
    const today = new Date();
    let firstDate = new Date();
    let lastDate = new Date();
    switch (period) {
      case 'yesterday':
        {
          firstDate.setDate(today.getDate() - 1);
          this.rangeDates = [firstDate, firstDate];
        }
        break;
      case 'last_7_days':
        {
          firstDate.setDate(today.getDate() - 7);
          lastDate.setDate(today.getDate() - 1);
          this.rangeDates = [firstDate, lastDate];
        }
        break;
      case 'last_30_days':
        {
          firstDate.setDate(today.getDate() - 30);
          lastDate.setDate(today.getDate() - 1);
          this.rangeDates = [firstDate, lastDate];
        }
        break;
      case 'this_month':
        {
          firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
          lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          this.rangeDates = [firstDate, lastDate];
        }
        break;
      case 'last_month':
        {
          firstDate = new Date(
            today.getFullYear() - (today.getMonth() > 0 ? 0 : 1),
            (today.getMonth() - 1 + 12) % 12,
            1
          );
          lastDate = new Date(today.getFullYear(), today.getMonth(), 0);
          this.rangeDates = [firstDate, lastDate];
        }
        break;
    }
    this.datePickerChanged.emit(this.rangeDates);
  }

  onDateSelected() {
    if (
      (this.config['filterType'] === 'month_range' ||
        this.config['filterType'] === 'date_range') &&
      this.rangeDates[1] === null
    ) {
      this.toastService.displayToast({
        severity: 'error',
        summary: 'Invalid Date',
        detail: 'Please select valid date range'
      });
      return;
    }
    document.body.click();
    
    if(this.rangeDates[0] === this.today)
    {
      this.rangeDates[0]=this.newStartDate;
      this.toastService.displayToast({
        severity: 'error',
        summary: 'Error',
        detail: 'You can not select future month'
      });

    } else {
     this.newStartDate = this.rangeDates[0];
    }
    if(this.rangeDates[1] === this.today)
    {
      this.rangeDates[1]=this.newEndDate;
      this.toastService.displayToast({
        severity: 'error',
        summary: 'Error',
        detail: ' You can not select future month'
      });

    } else {
     this.newEndDate = this.rangeDates[1];
    }
   
    if (this.config['filterType'] === 'month_range') {
      this.rangeDates[1] = moment(this.rangeDates[1], 'YYYYMMDD')
        .endOf('month')
        .toDate();
    }
    this.datePickerChanged.emit(this.rangeDates);
  }

}
