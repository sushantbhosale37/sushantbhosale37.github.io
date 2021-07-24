import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { FilterDataService, CommonLibService } from '../../../../_services';
import { Dimension } from '../models/dimension.model';
import { SaveQueryService } from 'src/app/_services/save-query/save-query.service';
import * as moment from 'moment';

@Component({
  selector: 'ym-dim-filter',
  templateUrl: './dim-filter.component.html',
  styleUrls: ['./dim-filter.component.scss']
})
export class DimFilterComponent implements OnInit {
  @ViewChild('dimensionsDropdown') dimensionsDropdown: any;
  @Input() defaultDimensions: Dimension[];
  @Input() availableDimensions: Dimension[];
  @Input() selectedDates: Date[];
  @Input() dateDimensionRelation = false;
  @Input() filterUrl: string;
  @Output() dimFilterChanged = new EventEmitter<object>();

  selectedDimensionToAdd: Dimension = { key: '', label: '', config_json: '' };
  availableFilterData: object = {};
  selectedFilterData: object = {};
  selectedFilterDataLocal: object = {};
  selectedDateFilter: object = {};

  constructor(
    private filterDataService: FilterDataService,
    private saveQueryService: SaveQueryService,
    private libServ: CommonLibService
  ) {}

  ngOnInit() {
    this.saveQueryService.selectedQuery.subscribe(query => {
      this.defaultDimensions.forEach(obj => {
        this.availableFilterData[obj['key']] = [];
        this.selectedFilterDataLocal[obj['key']] = [];
      });
      this.availableDimensions.forEach(obj => {
        this.availableFilterData[obj['key']] = [];
        this.selectedFilterDataLocal[obj['key']] = [];
      });
      setTimeout(() => {
        if (
          !this.libServ.isEmptyObj(query) &&
          Object.keys(query['filter']['dimensions']).length
        ) {
          this.selectedFilterData = this.libServ.deepCopy(
            query['filter']['dimensions']
          );
          this.selectedFilterDataLocal = this.libServ.deepCopy(
            query['filter']['dimensions']
          );
        } else {
          this.defaultDimensions.forEach(obj => {
            this.availableFilterData[obj['key']] = [];
            this.selectedFilterDataLocal[obj['key']] = [];
          });
          this.availableDimensions.forEach(obj => {
            this.availableFilterData[obj['key']] = [];
            this.selectedFilterDataLocal[obj['key']] = [];
          });
        }
      }, 0);
    });

    if (this.dateDimensionRelation) {
      this.selectedDateFilter = {
        time_key1: moment(this.selectedDates[0]).format('YYYYMMDD'),
        time_key2: moment(this.selectedDates[1]).format('YYYYMMDD')
      };
    }
  }

  onClickFilterCom(dim: Dimension, dimIdx: number) {
    if (this.availableFilterData[dim['key']].length > 0) {
      return;
    }
    const prevFilters = this.selectedDateFilter;
    this.defaultDimensions.forEach((d, idx) => {
      if (idx < dimIdx) {
        prevFilters[d['key']] = this.selectedFilterData[d['key']];
      }
    });
    this.getFilterValues(dim['key'], prevFilters);
  }

  onChangeFilterCom(dim: Dimension, dimIdx: number) {
    if (
      this.selectedFilterDataLocal[dim['key']] ===
      this.selectedFilterData[dim['key']]
    ) {
      return;
    }
    this.selectedFilterDataLocal[dim['key']] = this.selectedFilterData[
      dim['key']
    ];

    for (let i = 0; i < this.defaultDimensions.length; i++) {
      if (i > dimIdx) {
        this.availableFilterData[this.defaultDimensions[i]['key']] = [];
        this.selectedFilterData[this.defaultDimensions[i]['key']] = [];
        this.selectedFilterDataLocal[this.defaultDimensions[i]['key']] = [];
      }
    }
    const nextDim = this.defaultDimensions[dimIdx + 1];

    if (typeof nextDim !== 'undefined') {
      this.getFilterValues(
        nextDim['key'],
        Object.assign({}, this.selectedDateFilter, this.selectedFilterData)
      );
    }
    if (
      !this.libServ.isEqual(
        this.availableFilterData[dim['key']].map(e => e.key),
        this.selectedFilterData[dim['key']]
      )
    ) {
      this.dimFilterChanged.emit(this.selectedFilterData);
    }
  }

  getFilterValues(dim: string, params: object) {        
    let keys = Object.keys(params)

    keys.forEach(element => {
          
      if(params[element] != undefined && params[element].length > 0)
      {
          const str = "'" + params[element].join("'$$'") + "'";
          params[element] = [str];
      }
    });

    this.filterDataService
      .getFilterDataList(`${this.filterUrl}/${dim}`, params)
      .subscribe(res => {
        this.availableFilterData[dim] = [];
        const arr = this.libServ.deepCopy(res['data']);
        const arrExclude =
          this.defaultDimensions[0]['config_json'] &&
          this.defaultDimensions[0]['config_json'].hasOwnProperty('exclude')
            ? this.defaultDimensions[0]['config_json']['exclude'].split(',')
            : [];
        for (let i = 0; i < arr.length; i++) {
          arr[i]['value'] = arr[i]['label'];
        }
        console.log('defaultDimensions',this.defaultDimensions[0]['config_json'])
        arrExclude.forEach(element => {
          console.log('ele',element)
          if (arr.some(o => o.label === element)) {
            arr.splice(
              arr.findIndex(x => x.label === element),
              1
            );
          }
        });
        this.availableFilterData[dim].push(...arr);
      });
  }

  remove(d: Dimension) {
    const idx = this.defaultDimensions.indexOf(d);

    for (let i = idx; i < this.defaultDimensions.length; i++) {
      this.selectedFilterData[this.defaultDimensions[i]['key']] = [];
      this.availableFilterData[this.defaultDimensions[i]['key']] = [];
      this.selectedFilterDataLocal[this.defaultDimensions[i]['key']] = [];
    }
    if (idx + 1 < this.defaultDimensions.length) {
      this.getFilterValues(
        this.defaultDimensions[idx + 1]['key'],
        Object.assign({}, this.selectedDateFilter, this.selectedFilterData)
      );
    }

    this.availableDimensions.push(...this.defaultDimensions.splice(idx, 1));
    setTimeout(() => {
      this.dimensionsDropdown.options = this.availableDimensions;
    }, 0);
    this.dimFilterChanged.emit(this.selectedFilterData);
  }

  dimensionAdded() {
    this.defaultDimensions.push(this.selectedDimensionToAdd);
    this.availableDimensions.splice(
      this.availableDimensions.indexOf(this.selectedDimensionToAdd),
      1
    );
    this.getFilterValues(
      this.selectedDimensionToAdd['key'],
      Object.assign({}, this.selectedDateFilter, this.selectedFilterData)
    );
    this.selectedDimensionToAdd = { key: '', label: '', config_json: '' };
    this.dimensionsDropdown.options = this.availableDimensions;
  }

  pluralize(label) {
    if (label.endsWith('y')) {
      return label.slice(0, -1) + 'ies';
    } else {
      return label + 's';
    }
  }
}
