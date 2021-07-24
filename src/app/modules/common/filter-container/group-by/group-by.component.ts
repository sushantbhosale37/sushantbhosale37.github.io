import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dimension } from '../models/dimension.model';
import { SaveQueryService } from 'src/app/_services/save-query/save-query.service';
import { CommonLibService } from 'src/app/_services/common-lib/common-lib.service';

@Component({
  selector: 'ym-group-by',
  templateUrl: './group-by.component.html',
  styleUrls: ['./group-by.component.scss']
})
export class GroupByComponent implements OnInit {
  @Input() dimensions: Dimension[];
  @Output() grpByChanged = new EventEmitter<Dimension[]>();

  selectedGrpBy: Dimension[];

  constructor(
    private saveQueryService: SaveQueryService,
    public libServ: CommonLibService
  ) {}

  ngOnInit() {
    this.saveQueryService.selectedQuery.subscribe(query => {
      if (!this.libServ.isEmptyObj(query)) {
        setTimeout(() => {
          this.selectedGrpBy = query['groupby'];
          this.onChange();
        }, 0);
      } else {
        this.selectedGrpBy = this.dimensions.filter(d => d['selected']);
        this.onChange();
      }
    });
  }

  onChange() {
    if (this.selectedGrpBy.length == 0) {
      this.selectedGrpBy.push(this.dimensions[0]);
      return;
    }
    const arr = [];
    arr.push(...this.selectedGrpBy);
    arr.push(
      ...this.dimensions.filter(
        o => !this.selectedGrpBy.map(a => a['key']).includes(o['key'])
      )
    );
    this.dimensions = arr;

    this.grpByChanged.emit(this.selectedGrpBy);
  }
}
