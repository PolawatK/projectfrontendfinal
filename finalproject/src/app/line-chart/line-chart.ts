import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css'
})
export class LineChart implements AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;
  lineChart: any;

  constructor() {}

  ngAfterViewInit(): void {
    const salaryData = this.getMonthlySalaryTotals();
    this.lineChartMethod(salaryData); 
  }

  getMonthlySalaryTotals(): number[] {
    const data = localStorage.getItem('empdata');
    const empList = data ? JSON.parse(data) : [];

    const monthlyTotals = new Array(12).fill(0);

    empList.forEach((emp: any) => {
      if (emp.joindate && emp.salary) {
        const joinDate = new Date(emp.joindate);
        const joinMonth = joinDate.getMonth();
        const salaryNum = Number(String(emp.salary).replace(/[^\d.-]/g, ''));

        for (let m = joinMonth; m < 12; m++) {
        monthlyTotals[m] += salaryNum;
      }
      }
    });

    return monthlyTotals;
  }


  lineChartMethod(monthlySalary: number[]): void {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
        ],
        datasets: [
          {
            label: 'Total Salary per Month',
            fill: false,
            backgroundColor: 'red',
            borderColor: 'rgba(1, 170, 12, 0.62)',
            borderWidth: 2,
            pointBorderColor: 'rgba(0, 0, 0, 0.1)',
            pointBackgroundColor: '#FFF',
            pointBorderWidth: 5,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.1)',
            pointHoverBorderColor: 'rgba(0, 0, 0, 0.1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            tension: 0.3,
            data: monthlySalary, 
            spanGaps: true
          }
        ]
      }
    });
  }
}
