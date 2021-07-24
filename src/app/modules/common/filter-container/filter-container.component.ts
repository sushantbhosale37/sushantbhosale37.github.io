import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input
} from '@angular/core';
import { Dimension } from './models/dimension.model';
import * as moment from 'moment';
import { AppConfigService } from 'src/app/_services/app-config/app-config.service';
import { SaveQueryService } from 'src/app/_services/save-query/save-query.service';
import { CommonLibService } from 'src/app/_services/common-lib/common-lib.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { LoaderObsService } from '../../../_services/api-loader/loader-obs.service';

@Component({
  selector: 'ym-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnInit, OnDestroy {
  // @Input() private appFilters: object;
  @Input() dateDimensionRelation = false;
  @Output() filtersApplied = new EventEmitter<object>();
  appConfigObs: Subscription;

  public collapsed = false;
  public appConfig = {};
  public appFilters = {};
  public date_filter_config = [];
  public dimFilterFlag = true;
  public defaultDimensions = [];
  public availableDimensions = [];
  public defaultMetrics = [];
  public availableMetrics = [];
  public filterUrl = '';
  public selectedDimFilter: object = {};
  public selectedMetricFilter: object = {};
  public selectedGrpBy: Dimension[];
  public selectedDates: Date[];
  public groupByDims = [];
  public savedViews = [];
  public enableDatePicker = false;
  public selectedSavedView: string;
  public saveViewName: String = '';
  public displaySaveViewConfirmDialog = false;
  public setDefaultCheckbox = false;
  private BASE_URL: string = environment.baseUrl;
  displayLoad = false;

  constructor(
    private appConfigService: AppConfigService,
    private saveQueryService: SaveQueryService,
    public libServ: CommonLibService,
    private loaderService: LoaderObsService,
  ) { }

  ngOnInit() {
    this.loaderService.displayLoad.subscribe(visibility => {
      setTimeout(() => {
        this.displayLoad = visibility;
      });
    });
    this.appConfigObs = this.appConfigService.appConfig.subscribe(appConfig => {
      if (!this.libServ.isEmptyObj(appConfig)) {
        this.appConfig = appConfig;
        if (!this.libServ.isEmptyObj(appConfig['filter'])) {
          this.appFilters = this.libServ.deepCopy(
            appConfig['filter']['filterConfig']['filters']
          );
          this.selectedGrpBy = this.libServ.deepCopy(
            appConfig['filter']['filterConfig']['groupBy']
          );
          this.changeConfig();

          if (this.appConfig['filter']['filterConfig']['saveView']) {
            this.saveQueryService.changeSelectedQuery({
              date_filter_config: this.appFilters['datePeriod'][0],
              filter: {
                dimensions: this.selectedDimFilter,
                metrics: this.selectedMetricFilter
              },
              groupby: this.selectedGrpBy
            });
            this.saveQueryService.allQueries.subscribe(res => {
              if (!this.libServ.isEmptyObj(res)) {
                this.savedViews = res as [];
                this.selectedSavedView = this.savedViews.find(
                  v => v['isDefault'] === 'true'
                );
                this.viewChanged();
              }
            });
          }
        }
      }
    });
  }

  changeConfig() {
    this.filterUrl = `${this.BASE_URL}${this.appFilters['url']}`;
    this.defaultDimensions = this.appFilters['dimension']['default'];
    this.availableDimensions = this.appFilters['dimension']['available'];
    this.defaultMetrics = this.appFilters['metric']['default'];
    this.availableMetrics = this.appFilters['metric']['available'];
    this.groupByDims = this.selectedGrpBy;
    this.date_filter_config = this.appFilters['datePeriod'];

    if (
      typeof this.date_filter_config !== 'undefined' &&
      !this.libServ.isEmptyObj(this.date_filter_config)
    ) {
      this.enableDatePicker = true;
      let startDate;
      let endDate;

      if ((this.date_filter_config[0]['defaultDate'][0]['value'] === 0 && this.date_filter_config[0]['defaultDate'][0]['period'] === 'month') && (moment().format('DD') === '01' || moment().format('DD') === '02')) {
        startDate = moment().subtract(1, 'months').startOf('month');
        endDate = moment().subtract(1, 'months').endOf('month');
      } else {
        if (this.date_filter_config[0]['defaultDate'][0]['startOf']) {
          startDate = moment()
            .subtract(
              this.date_filter_config[0]['defaultDate'][0]['value'],
              this.date_filter_config[0]['defaultDate'][0]['period']
            )
            .startOf(this.date_filter_config[0]['defaultDate'][0]['period']);
        } else {
          startDate = moment().subtract(
            this.date_filter_config[0]['defaultDate'][0]['value'],
            this.date_filter_config[0]['defaultDate'][0]['period']
          );
        }

        endDate = moment().subtract(
          this.date_filter_config[0]['defaultDate'][1]['value'],
          this.date_filter_config[0]['defaultDate'][1]['period']
        );
      }


      if (this.date_filter_config[0]['filterType'] === 'single_date') {
        this.selectedDates = [startDate.toDate()];
      } else if (this.date_filter_config[0]['filterType'] === 'date_range') {
        this.selectedDates = [startDate.toDate(), endDate.toDate()];
      } else if (this.date_filter_config[0]['filterType'] === 'single_month') {
        this.selectedDates = [startDate.toDate()];
      } else if (this.date_filter_config[0]['filterType'] === 'month_range') {
        this.selectedDates = [startDate.toDate(), endDate.toDate()];
      }
    }
  }

  onApplyFilterClicked() {
    document.body.click();
    setTimeout(() => {
      this.filtersApplied.emit({
        date: this.enableDatePicker
          ? this.selectedDates.map(o => moment(o).format('YYYYMMDD'))
          : '',
        filter: {
          dimensions: this.selectedDimFilter,
          metrics: this.selectedMetricFilter
        },
        groupby: this.selectedGrpBy
      });
    }, 0);
  }

  onResetFilterClicked() {
    this.appConfig = {};
    this.selectedDimFilter = {};
    this.selectedMetricFilter = {};
    this.selectedGrpBy = [];
    this.selectedDates = [];
    this.groupByDims = [];
    this.savedViews = [];

    setTimeout(() => {
      this.appConfigService.appConfig.subscribe(appConfig => {
        if (!this.libServ.isEmptyObj(appConfig)) {
          this.appConfig = appConfig;
          if (!this.libServ.isEmptyObj(appConfig['filter'])) {
            this.appFilters = this.libServ.deepCopy(
              appConfig['filter']['filterConfig']['filters']
            );
            this.selectedGrpBy = this.libServ.deepCopy(
              appConfig['filter']['filterConfig']['groupBy']
            );
            this.changeConfig();

            if (this.appConfig['filter']['filterConfig']['saveView']) {
              this.saveQueryService.changeSelectedQuery({
                date_filter_config: this.appFilters['datePeriod'][0],
                filter: {
                  dimensions: this.selectedDimFilter,
                  metrics: this.selectedMetricFilter
                },
                groupby: this.selectedGrpBy
              });
              this.saveQueryService.allQueries.subscribe(res => {
                if (!this.libServ.isEmptyObj(res)) {
                  this.savedViews = res as [];
                  this.selectedSavedView = this.savedViews.find(
                    v => v['isDefault'] === 'true'
                  );
                  this.viewChanged();
                }
              });
            }
          }
        }
      });
    }, 0);
  }

  datePickerChanged() {
    // Refresh dimension filter if date picker changed
    if (this.dateDimensionRelation) {
      this.dimFilterFlag = false;
      setTimeout(() => {
        this.dimFilterFlag = true;
      });
    }
  }
  saveQuery() {
    const config_json = {
      date: this.selectedDates.map(o => moment(o).format('YYYYMMDD')),

      availableDimensions: this.availableDimensions,
      availableMetrics: this.availableMetrics,

      defaultDimensions: this.defaultDimensions,
      defaultMetrics: this.defaultMetrics,

      filter: {
        dimensions: this.selectedDimFilter,
        metrics: this.selectedMetricFilter
      },
      groupby: this.selectedGrpBy
    };

    const param = {
      userId: this.appConfig['user']['id'],
      appId: this.appConfig['id'],
      saveViewJson: config_json,
      stateName: this.saveViewName,
      isDefault: this.setDefaultCheckbox
    };

    this.saveQueryService.addSavedQueries(param);

    this.saveViewName = '';
    this.setDefaultCheckbox = false;
  }

  viewChanged() {
    this.appFilters['dimension']['default'] = JSON.parse(
      this.selectedSavedView['stateJson']
    )['defaultDimensions'];

    this.appFilters['dimension']['available'] = JSON.parse(
      this.selectedSavedView['stateJson']
    )['availableDimensions'];

    this.appFilters['metric']['default'] = JSON.parse(
      this.selectedSavedView['stateJson']
    )['defaultMetrics'];

    this.appFilters['metric']['available'] = JSON.parse(
      this.selectedSavedView['stateJson']
    )['availableMetrics'];

    const dt = [
      moment(JSON.parse(this.selectedSavedView['stateJson'])['date'][0]),
      moment(JSON.parse(this.selectedSavedView['stateJson'])['date'][1])
    ];
    this.appFilters['datePeriod'][0]['defaultDate'] = dt;
    this.changeConfig();
    this.selectedDimFilter = JSON.parse(this.selectedSavedView['stateJson'])[
      'filter'
    ]['dimensions'];
    this.selectedMetricFilter = JSON.parse(this.selectedSavedView['stateJson'])[
      'filter'
    ]['metrics'];

    this.saveQueryService.changeSelectedQuery({
      date_filter_config: this.date_filter_config[0],
      filter: {
        dimensions: this.selectedDimFilter,
        metrics: this.selectedMetricFilter
      },
      groupby: JSON.parse(this.selectedSavedView['stateJson'])['groupby']
    });

    this.appConfigService.changeAppConfig(this.appConfig);
  }

  ngOnDestroy(): void {
    if (this.appConfigObs && !this.appConfigObs.closed) {
      this.appConfigObs.unsubscribe();
    }
  }
}
