import { AfterViewInit,Component,ElementRef,ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto'

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css'
})
export class LineChart implements AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  lineChart: any;

  constructor(){}

    ngAfterViewInit():void{
      this.lineChartMethod();
    }
  

  lineChartMethod():void{
    this.lineChart = new Chart(this.lineCanvas?.nativeElement,{
      type: 'line',
      data:{
        labels:[
          'jan',
          'Feb',
          'Mar',
          'April',
          'May',
          'june',
          'july',
          'August',
          'September',
          'November',
          'Dec',
        ],
        datasets:[{
          label:'Sellperweek',
          fill: true,
          backgroundColor: 'red',
          borderColor:'rgba(0, 0, 0, 0.1)',
          borderCapStyle: 'butt',
          borderDash:[],
          borderDashOffset: 0.0,
          pointBorderColor:'rgba(0, 0, 0, 0.1)',
          pointBackgroundColor:'#FFF',
          pointBorderWidth:5,
          pointHoverRadius:10,
          pointHoverBackgroundColor:'rgba(0, 0, 0, 0.1)',
          pointHoverBorderColor:'rgba(0, 0, 0, 0.1)',
          pointHoverBorderWidth:2,
          pointRadius:1,
          pointHitRadius:2,
          data:[65,59,62,80,81,54,25,23,59,100,110,54],
          spanGaps:true
        }
          
        ]
      }
    })
  }
  
}

