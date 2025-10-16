import { Component,signal } from '@angular/core';
import { RouterLink} from '@angular/router';
import { OnInit } from '@angular/core';
import { LineChart } from "../line-chart/line-chart";
import { DatePipe,CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, LineChart,CurrencyPipe,NgClass,NgFor,NgIf],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
  username: string = 'Guest';
  totalEmployees = signal(0);
  totalSalary = signal(0);
  activityLogs = signal<any[]>([]);
  onWorkToday = signal(0);

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
    }

    const attendanceData = JSON.parse(localStorage.getItem('attendance') || '[]');
    const today = new Date().toISOString().split('T')[0];

    const todayData = attendanceData.find((d: any) => d.date === today);
    if (todayData) {
      const presentCount = todayData.records.filter(
        (r: any) => r.status.toLowerCase() === 'present' || r.status.toLowerCase() === 'work'
      ).length;

      this.onWorkToday.set(presentCount);
    } else {
      this.onWorkToday.set(0);
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
  formatDateTime(iso: string): string {
    const date = new Date(iso);
    const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  return date.toLocaleString('en-GB', options); 
  }
}