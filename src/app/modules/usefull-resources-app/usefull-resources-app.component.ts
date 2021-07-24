import { Component } from '@angular/core';

@Component({
  selector: 'ym-usefull-resources-app',
  templateUrl: './usefull-resources-app.component.html',
  styleUrls: ['./usefull-resources-app.component.scss']
})
export class UsefullResourcesAppComponent {
  noTableData = false;
  columns: object[];
  filtersApplied: object = {};
  appConfig: object = {};
  imps: any;
  cpm: any;
  cost: any;
  result: any;
  hostnum: any;
  thirdnum: any;
  diffresult;
  disresult;
  UTMurl = '';
  UTMsource: any;
  UTMmedium;
  UTMcampaign;
  UTMcontent;
  UTMoutput;
  UTMsource1: any;
  UTMmedium1: any;
  UTMcampaign1;
  UTMcontent1;
  result1;

  constructor(
  ) { }

  cpmcalculate() {
    if (this.imps === '') {
      this.result = this.cost / this.cpm * 1000;
      this.imps = this.result;
    } else if (this.cpm === '') {
      this.cpm = (this.cost / this.imps * 1000).toFixed(2);
    } else {
      this.cost = (this.imps * this.cpm / 1000).toFixed(2);
    }
  }

  clear1() {
    this.cpm = '';
    this.cost = '';
    this.imps = '';
  }

  discrepancycalculate() {
    if (this.hostnum !== '' && this.thirdnum !== '') {
      this.diffresult = this.hostnum - this.thirdnum;
      this.disresult = ((this.hostnum - this.thirdnum) / this.hostnum * 100).toFixed(2);
    }
  }

  clear2() {
    this.hostnum = '';
    this.thirdnum = '';
    this.diffresult = '';
    this.disresult = '';
  }

  UTMsubmit() {
    if (this.UTMsource !== undefined) {
      this.UTMsource1 = `?utm_source=${this.UTMsource}`;
    } else {
      this.UTMsource1 = '';
    }
    if (this.UTMmedium !== undefined) {
      this.UTMmedium1 = `&utm_medium=${this.UTMmedium}`;
    } else {
      this.UTMmedium1 = '';
    }
    if (this.UTMcampaign !== undefined) {
      this.UTMcampaign1 = `&utm_campaign=${this.UTMcampaign}`;

    } else {
      this.UTMcampaign1 = '';
    }
    if (this.UTMcontent !== undefined) {
      this.UTMcontent1 = `&utm_content=${this.UTMcontent}`;

    } else {
      this.UTMcontent1 = '';
    }
    this.result1 = `${this.UTMurl}${this.UTMsource1}${this.UTMmedium1}${this.UTMcampaign1}${this.UTMcontent1}`;
    this.UTMoutput = this.result1;
  }

  copyToClipboard(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  utmclear() {
    this.UTMurl = '';
    this.UTMsource = '';
    this.UTMmedium = '';
    this.UTMcampaign = '';
    this.UTMcontent = '';
    this.UTMoutput = '';
  }
}
