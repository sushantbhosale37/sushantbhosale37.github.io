import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core';

import { CommonLibService } from 'src/app/_services/common-lib/common-lib.service';
import { ExportPptService } from 'src/app/_services/export/export-ppt.service';
import { HtmltoimageService } from 'src/app/_services/screencapture/htmltoimage.service';
import { UIChart } from 'primeng/chart';
import 'chartjs-plugin-labels';
import 'chartjs-plugin-trendline';
import { FormatNumPipe } from 'src/app/_pipes/number-format.pipe';

@Component({
  selector: 'ym-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input() private chartsJson: object;
  @Output() chartDataSelect = new EventEmitter<Event>();

  @ViewChildren('myChart') myChart: QueryList<ElementRef>;
  @ViewChild('myChart') chartElement: UIChart;

  data: object;
  plugIn: object;
  charts: [];
  options: object;
  zoom: boolean;
  width: string;
  height: string;
  hasClass: boolean;
  activeChartIdx: number;
  calculateData: any[];
  calculate_value: object = {
    'is_show': false,
    'min': false,
    'med': false,
    'max': false,
    'avg': false
  };
  constructor(
    private libServ: CommonLibService,
    private pptExport: ExportPptService,
    private htmltoimage: HtmltoimageService,
    private targetEl: ElementRef,
    private renderer: Renderer2,

    private formatNumPipe: FormatNumPipe,
  ) { }

  ngOnInit() {
    this.activeChartIdx = 0;
    this.charts = this.chartsJson['chartTypes'];
    this.data = this.chartsJson['chartData'];
    this.options = this.chartsJson['chartOptions'];
    this.zoom = this.chartsJson['zoomLabel'];
    this.width = this.chartsJson['chartWidth'];
    this.hasClass = false;
    this.width =
      this.width === '' || typeof this.width === 'undefined'
        ? ''
        : this.chartsJson['chartWidth'];

    this.height = this.chartsJson['chartHeight'];

    this.height =
      this.height === '' || typeof this.height === 'undefined'
        ? ''
        : this.chartsJson['chartHeight'];

    if (typeof this.options['scales'] !== 'undefined') {
      this.options['scales']['xAxes'][0]['stacked'] =
        this.chartsJson['chartTypes'][this.activeChartIdx]['key'] === 'bar'
          ? this.chartsJson['chartTypes'][this.activeChartIdx]['stacked']
          : false;
      this.options['scales']['yAxes'][0]['stacked'] =
        this.chartsJson['chartTypes'][this.activeChartIdx]['key'] === 'bar'
          ? this.chartsJson['chartTypes'][this.activeChartIdx]['stacked']
          : false;
      if (typeof this.options['scales']['yAxes'] !== 'undefined') {
        this.options['scales']['yAxes'].forEach(obj => {
          Object.assign(obj['ticks'], { beginAtZero: true });
        });
      }
    }
    this.options['plugins']['renderLegends'] = { renderred: false, legendPosition: this.options['legend']['position'] };
    if (!this.options['plugins']['labels']) {
      this.options['plugins']['labels'] = false;
    }
    this.options['legend']['display'] = false;
    Object.assign(this.options['title'], {
      fontSize: 16,
      fontColor: '#010101'
    });
    if (this.chartsJson['calculate_value'] && this.chartsJson['calculate_value']['is_show']) {
      this.calculation(this.chartsJson['chartData']['datasets'], this.chartsJson['chartData']['labels']);
      this.calculate_value = this.chartsJson['calculate_value'];
    }

    this.plugIn = {
      id: 'renderLegends',
      beforeRender: (chart, options) => {
        if (options.renderred === false) {
          options.renderred = true;
          // if (this.renderer.selectRootElement('.legends-container')) {
          //   const ele = this.renderer.selectRootElement('.legends-container');
          //   this.renderer.removeChild(this.targetEl.nativeElement, ele);
          // }
          if (this.targetEl.nativeElement.hasChildNodes()) {
            const children = this.targetEl.nativeElement.childNodes;
            children.forEach(element => {
              if (
                typeof element.className !== 'undefined' &&
                element.className.includes('legends-container')
              ) {
                this.targetEl.nativeElement.removeChild(element);
              }
            });
          }
          const $legendsContainer = this.renderer.createElement('div');
          this.renderer.addClass($legendsContainer, 'legends-container');
          const $legends = this.renderer.createElement('ul');
          this.renderer.addClass($legends, 'lengends');
          const $prevIcon = this.renderer.createElement('span');
          this.renderer.addClass($prevIcon, 'navigation-icon');
          this.renderer.addClass($prevIcon, 'navigation-icon-left');
          const $nextIcon = this.renderer.createElement('span');
          this.renderer.addClass($nextIcon, 'navigation-icon');
          this.renderer.addClass($nextIcon, 'navigation-icon-right');
          let scroll = 0;
          if (chart.legend.legendItems.length < 3) {
            this.renderer.addClass($prevIcon, 'disabled-scroll');
            this.renderer.addClass($nextIcon, 'disabled-scroll');
          }
          this.renderer.addClass($prevIcon, 'disabled-scroll');
          this.renderer.appendChild($legendsContainer, $prevIcon);
          this.renderer.appendChild($legendsContainer, $legends);
          this.renderer.appendChild($legendsContainer, $nextIcon);
          console.log('legends', chart.legend.legendItems);
          for (const [key, value] of Object.entries(chart.legend.legendItems)) {
            const $legend = this.renderer.createElement('li');
            const legentText = this.renderer.createText(value['text']);
            this.renderer.setAttribute($legend, 'title', value['text']);
            const $span = this.renderer.createElement('span');
            this.renderer.setAttribute($span, 'style', `background-color: ${value['fillStyle']} ;border: 2px solid ${value['strokeStyle'] == '#fff' ? value['fillStyle'] : value['strokeStyle']}`);
            this.renderer.addClass($span, 'legend-item');
            this.renderer.appendChild($legend, $span);
            this.renderer.appendChild($legend, legentText);
            this.renderer.listen($legend, 'click', () => {
              chart.legend.options.onClick.call(chart, event, chart.legend.legendItems[key]);
              if (!chart.legend.legendItems[key]['hidden']) {
                this.renderer.removeClass($legend, 'excluded');
              } else {
                this.renderer.addClass($legend, 'excluded');
              }
              chart.update();
            });
            this.renderer.appendChild($legends, $legend);
          }
          // console.log('option', options)
          if (options['legendPosition'] == 'bottom') {
            this.renderer.addClass($legendsContainer, 'margin-top');
            this.renderer.appendChild(this.targetEl.nativeElement,
              $legendsContainer);
          } else {
            this.renderer.insertBefore(this.targetEl.nativeElement,
              $legendsContainer, this.targetEl.nativeElement.lastChild);
          }


          this.renderer.listen($prevIcon, 'click', () => {
            if (scroll) {
              scroll -= 250;
              this.renderer.setProperty($legends, 'scrollLeft', scroll);
            }
          });
          this.renderer.listen($nextIcon, 'click', () => {
            scroll += 250;
            this.renderer.setProperty($legends, 'scrollLeft', scroll);
          });
          this.renderer.listen($legends, 'scroll', (e) => {
            if (($legends.clientWidth + scroll) >= ($legends.scrollWidth - 10)) {
              this.renderer.addClass($nextIcon, 'disabled-scroll');
              this.renderer.removeClass($prevIcon, 'disabled-scroll');
            } else if (($legends.clientWidth + 10) >= ($legends.clientWidth + scroll)) {
              this.renderer.addClass($prevIcon, 'disabled-scroll');
              this.renderer.removeClass($nextIcon, 'disabled-scroll');
            } else {
              this.renderer.removeClass($nextIcon, 'disabled-scroll');
              this.renderer.removeClass($prevIcon, 'disabled-scroll');
            }
          });
        }
      }
    };
  }
  calculation(datasets, labels) {
    this.calculateData = [];
    let yAxesRight = datasets.filter(x => x.yAxisID == 'RightAxis-1');
    let yAxesLeft = datasets.filter(x => x.yAxisID == 'LeftAxis-1');

    if (yAxesLeft.length == 1) {
      let data = yAxesLeft[0]['data'];
      let sum = data.reduce((a, b) => a + b);
      let min = data.reduce((a, b) => Math.min(a, b));
      let max = data.reduce((a, b) => Math.max(a, b));
      let avg = sum / data.length;
      let med = (min + max) / 2;
      this.calculateData.push({
        min: min,
        max: max,
        avg: avg,
        med: med,
        format: yAxesLeft[0]['format'],
        borderColor: yAxesLeft[0]['borderColor']
      });
      console.log('leeettt', this.calculateData, data)
    }

    if (yAxesRight.length == 1) {
      let data = yAxesRight[0]['data'];
      let sum = data.reduce((a, b) => a + b);
      let min = data.reduce((a, b) => Math.min(a, b));
      let max = data.reduce((a, b) => Math.max(a, b));
      let avg = sum / data.length;
      let med = (min + max) / 2;
      this.calculateData.push({
        min: min,
        max: max,
        avg: avg,
        med: med,
        format: yAxesRight[0]['format'],
        borderColor: yAxesRight[0]['borderColor']
      });
    }

    if (yAxesRight.length > 1) {

      let data = [];
      labels.forEach((element, i) => {
        let sumOfStack = 0;
        yAxesRight.forEach(element => {
          sumOfStack = sumOfStack + (element['data'][i] != null ? element['data'][i] : 0);
        });
        data.push(sumOfStack);
      });

      let sum = data.reduce((a, b) => a + b);
      let min = data.reduce((a, b) => Math.min(a, b));
      let max = data.reduce((a, b) => Math.max(a, b));
      let avg = sum / data.length;
      let med = (min + max) / 2;
      this.calculateData.push({
        min: min,
        max: max,
        avg: avg,
        med: med,
        format: yAxesRight[0]['format'],
        borderColor: 'conic-gradient(yellow 8.3%, greenyellow 0 16.6%, green 0 24.9%, darkgreen 0 33.2%, blue 0 41.5%, violet 0 49.8%, purple 0 58.1%, pink 0 66.4%, red 0 74.7%, orangered 0 83%, orange 0 91.3%, gold 0 100%)'
      });
    }
    if (yAxesLeft.length > 1) {

      let data = [];
      labels.forEach((element, i) => {
        let sumOfStack = 0;
        yAxesLeft.forEach(element => {
          if (element['data'][i] && element['data'][i] != null) {
            sumOfStack = sumOfStack + element['data'][i];
          }
        });
        data.push(sumOfStack);
      });

      let sum = data.reduce((a, b) => a + b);
      let min = data.reduce((a, b) => Math.min(a, b));
      let max = data.reduce((a, b) => Math.max(a, b));
      let avg = sum / data.length;
      let med = (min + max) / 2;
      this.calculateData.push({
        min: min,
        max: max,
        avg: avg,
        med: med,
        format: yAxesLeft[0]['format'],
        borderColor: 'conic-gradient(yellow 8.3%, greenyellow 0 16.6%, green 0 24.9%, darkgreen 0 33.2%, blue 0 41.5%, violet 0 49.8%, purple 0 58.1%, pink 0 66.4%, red 0 74.7%, orangered 0 83%, orange 0 91.3%, gold 0 100%)'
      });
    }

  }

  chartChanged = () => {
    this.options['scales']['xAxes'][0]['stacked'] =
      this.chartsJson['chartTypes'][this.activeChartIdx]['key'] === 'bar'
        ? this.chartsJson['chartTypes'][this.activeChartIdx]['stacked']
        : false;
    this.options['scales']['yAxes'][0]['stacked'] =
      this.chartsJson['chartTypes'][this.activeChartIdx]['key'] === 'bar'
        ? this.chartsJson['chartTypes'][this.activeChartIdx]['stacked']
        : false;
    this.data = Object.assign({}, this.data);
  }

  selectData(event: any) {
    this.chartDataSelect.emit(event);
  }

  captureFn(type) {
    let img;
    let title = this.options['title']['text'] != '' ? this.options['title']['text'] : 'Sample';
    const imageConfig = {
      imgName: `${title}.png`,
      type: 'image/png'
    };
    this.htmltoimage.canvasImage(
      this.targetEl.nativeElement,
      imageConfig
    ).then(canvas => {
      img = this.libServ.canvasToImage('white', canvas);
      if (type === 'image') {
        const link = document.getElementById('link');
        link.setAttribute('download', `${title}.jpeg`);
        link.setAttribute('href', img);
        link.click();
      } else if (type === 'ppt') {
        const pptConfig = {
          filename: 'Charts',
          logo: {
            visible: true,
            path: '/assets/images/ym.png',
            width: 0.53125,
            height: 0.458333
          },
          slides: [
            {
              title: title,
              base64data: img,
              width: 8,
              height: 3
            }
          ]
        };
        this.pptExport.exportPPT(pptConfig);
      }
    });
    return false;
  }

  reinitChart() {
    this.chartElement.reinit();
    // this.chartElement.refresh();
  }
}
