import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { Metric } from '../models/metric.model';
import { SaveQueryService } from 'src/app/_services/save-query/save-query.service';

@Component({
  selector: 'ym-metric-filter',
  templateUrl: './metric-filter.component.html',
  styleUrls: ['./metric-filter.component.scss']
})
export class MetricFilterComponent implements OnInit {
  @ViewChild('metricsDropdown') metricsDropdown: any;
  @Input() defaultMetrics: Metric[];
  @Input() availableMetrics: Metric[];
  @Output() metricFilterChanged = new EventEmitter<object>();

  public selectedMetricRange: object = {};
  public selectedMetricToAdd: Metric = { key: '', label: '', config_json: '' };

  constructor(private saveQueryService: SaveQueryService) {}

  ngOnInit() {
    this.saveQueryService.selectedQuery.subscribe(query => {
      this.defaultMetrics.forEach(obj => {
        this.selectedMetricRange[obj['key']] = [null, null];
      });
      this.availableMetrics.forEach(obj => {
        this.selectedMetricRange[obj['key']] = [null, null];
      });
      setTimeout(() => {
        if (Object.keys(query['filter']['metrics']).length) {
          this.selectedMetricRange = query['filter']['metrics'];
        } else {
          this.defaultMetrics.forEach(obj => {
            this.selectedMetricRange[obj['key']] = [null, null];
          });
          this.availableMetrics.forEach(obj => {
            this.selectedMetricRange[obj['key']] = [null, null];
          });
        }
        this.onChange();
      }, 0);
    });
  }

  onChange() {
    this.metricFilterChanged.emit(this.selectedMetricRange);
  }

  merticAdded() {
    this.defaultMetrics.push(this.selectedMetricToAdd);
    this.availableMetrics.splice(
      this.availableMetrics.indexOf(this.selectedMetricToAdd),
      1
    );
    this.selectedMetricToAdd = { key: '', label: '', config_json: '' };
    this.metricsDropdown.options = this.availableMetrics;
  }

  remove(m: Metric) {
    this.availableMetrics.push(
      ...this.defaultMetrics.splice(this.defaultMetrics.indexOf(m), 1)
    );
    this.selectedMetricRange[m['key']] = [null, null];
    this.metricsDropdown.options = this.availableMetrics;
  }
}
