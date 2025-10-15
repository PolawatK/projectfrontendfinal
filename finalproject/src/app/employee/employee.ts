import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Employee{
  id:number;
  name:string;
  salary:number;
}
@Component({
  selector: 'app-employee',
  imports: [RouterLink],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee {
  empdata = [
    {id:101, name:"piew",joindate:"18/09/2005",position:"Full-stack", salary:25000},
    {id:102, name:"piew",joindate:"18/09/2005",position:"Full-stack", salary:25000},
    {id:103, name:"piew",joindate:"18/09/2005",position:"Full-stack", salary:25000},
    {id:104, name:"piew",joindate:"18/09/2005",position:"Full-stack", salary:25000},
  ]
}
