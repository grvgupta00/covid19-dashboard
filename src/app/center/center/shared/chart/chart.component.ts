import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() options:any;

  Highcharts = Highcharts;
  chartConstructor = 'chart';
  chartOptions={};
  updateFlag=false;
  oneToOneFlag = true;
  constructor() { }

  ngOnInit(): void {
    this.chartOptions = this.options;
  }

  ngOnChanges(change:SimpleChanges){
    this.chartOptions = change.options.currentValue;
    this.updateFlag = true;
  }

}
