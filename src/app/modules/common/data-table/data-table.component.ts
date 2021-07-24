import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardsModel } from '../../../_models';
import { CommonLibService } from 'src/app/_services';

@Component({
  selector: 'ym-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() private tableJson: object;
  @Output() exportTableEvent = new EventEmitter<string>();
  @Output() onColumnResizeEvent = new EventEmitter();

  public tableData: object = {
    flatTableJson: {
      page_size: 10,
      page: 0,
      lazy: false,
      loading: false,
      export: true,
      sortMode: 'multiple',
      resizableColumns: true,
      columnResizeMode: 'fit',
      reorderableColumns: true,
      scrollHeight: '350px',
      totalRecords: 1000,
      columns: [],
      selectedColumns: [],
      globalFilterFields: [],
      frozenCols: [],
      frozenWidth: '0px',
      scrollable: true,
      selectionMode: 'multiple',
      selectedColsModal: [],
      selectionDataKey: 'name',
      metaKeySelection: true,
      showHideCols: true,
      overallSearch: true,
      columnSearch: true
    },
    flatTableData: []
  };

  constructor(private libServ: CommonLibService) { }

  ngOnInit() {
    this.tableData = this.tableJson;
  }

  exportTable(format) {
    this.exportTableEvent.emit(format);
  }
  onColumnResize() {
    this.onColumnResizeEvent.emit();
  }
  changeDateTomoment(value) {
    if (value != '') {
      let splitData = value.split('-');
      if (splitData.length == 2) {
        value = splitData[0] + splitData[1];
      } else if (splitData.length == 3) {
        value = splitData[2] + splitData[0] + splitData[1];
      }
    }
    return value;
  }
}
