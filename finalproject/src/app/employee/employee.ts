import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employeedata } from '../employeedata/employeedata';
import { Insertemployee } from '../insertemployee/insertemployee';

export interface EmployeeModel{
  id:number;
  name:string;
  joindate: Date;     
  position: string;
  salary:number;
}
@Component({
  selector: 'app-employee',
  imports: [RouterLink,Employeedata,Insertemployee],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit { 
   empdata: EmployeeModel[] = [];

  ngOnInit() {
    const data = localStorage.getItem('empdata');
    this.empdata = data ? JSON.parse(data) : [
    { id: 101, name: "piew", joindate: new Date("2005-09-18"), position: "Full-stack", salary: 25000 },
    { id: 102, name: "dew",  joindate: new Date("2005-09-18"), position: "Backend",    salary: 30000 },
    { id: 103, name: "few",  joindate: new Date("2005-09-18"), position: "Frontend",   salary: 28000 },
    { id: 104, name: "mew",  joindate: new Date("2005-09-18"), position: "Tester",     salary: 22000 },
    ];
  }
  addNewEmployee(emp: EmployeeModel) {
    this.empdata.push(emp);
    localStorage.setItem('empdata', JSON.stringify(this.empdata));
  }
  removeDataById(id: number) {
    alert("ข้อมูลที่ส่งมาคือ " + id);
    this.empdata = this.empdata.filter(emp => emp.id !== id);
    localStorage.setItem('empdata', JSON.stringify(this.empdata));
  }

}
