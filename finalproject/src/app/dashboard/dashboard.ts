import { Component,signal } from '@angular/core';
import { RouterLink} from '@angular/router';
import { OnInit } from '@angular/core';
import { LineChart } from "../line-chart/line-chart";
import { DatePipe,CurrencyPipe, NgClass, NgFor } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, LineChart,CurrencyPipe,NgClass,NgFor],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
  username: string = 'Guest';
  totalEmployees = signal(0);
  totalSalary = signal(0);
  activityLogs = signal<any[]>([]);
  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
    }
    

    const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    this.activityLogs.set(logs.slice(0, 10));
    
    const data = localStorage.getItem('empdata');
    const empList = data ? JSON.parse(data) : [];
    this.totalEmployees.set(empList.length);

    const sum = empList.reduce((total: number, emp: any) => {
      const salaryNum = Number(
        String(emp.salary).replace(/[^\d.-]/g, '') 
      );
      return total + (isNaN(salaryNum) ? 0 : salaryNum);
    }, 0);

    this.totalSalary.set(sum);
  }
  formatTime(iso: string): string {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}