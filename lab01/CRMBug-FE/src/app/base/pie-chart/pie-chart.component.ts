import { AfterViewInit, Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as $ from 'jquery'

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges, AfterViewInit {
  static nextID : number = 0;

  container: string = `pie-chart-${PieChartComponent.nextID++}`;


  highcharts = Highcharts;

  @Input()
  series: Array<any> = [];

  @Input()
  title: string = '';

  constructor(
    private zone: NgZone
  ) { 
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.series?.previousValue != changes.series?.currentValue) {
      this.renderChart();
    }
  }

  renderChart() {
    if($(`#${this.container}`) && $(`#${this.container}`).length > 0) {
      console.log(this.series);
      Highcharts.chart(this.container, {
        title : {
          text: this.title ? this.title : ""
        },
        tooltip : {
          formatter: function() {
            const point: any = this.point;
            return `${point.name}: <b>${point.percentage.toFixed(2)}%</b> (${point.y})`
          }
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> ({series.y})'
        },
        plotOptions : {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
      
            dataLabels: {
              enabled: false           
            },
            showInLegend: true
          }
        },
        series: this.series
      });
    }
  }
}
