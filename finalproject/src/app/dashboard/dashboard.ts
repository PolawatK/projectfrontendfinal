import { Component,signal } from '@angular/core';
import { RouterLink} from '@angular/router';
import { OnInit } from '@angular/core';
import { LineChart } from "../line-chart/line-chart";
import { DatePipe,CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, LineChart,CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
  username: string = 'Guest';
  totalEmployees = signal(0);
  totalSalary = signal(0);
  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
    }
    
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
}