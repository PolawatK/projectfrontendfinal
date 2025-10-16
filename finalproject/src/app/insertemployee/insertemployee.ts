import { Component,signal,output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeModel } from '../employee/employee';

@Component({
  selector: 'app-insertemployee',
  imports: [FormsModule,RouterLink],
  templateUrl: './insertemployee.html',
  styleUrl: './insertemployee.css'
})
export class Insertemployee {
fullname = signal('');
joindate = signal('');
position = signal('');
salary = signal(0);
onSave = output<EmployeeModel>()

constructor(private router: Router) {}

addNewEmployee(){
  const emp: EmployeeModel = {
      id: Math.floor(Math.random() * 1000),
      name: this.fullname(),
      joindate: new Date(this.joindate()),
      position: this.position(),
      salary: this.salary()
    };

    
    const data = localStorage.getItem('empdata');
    const empList = data ? JSON.parse(data) : [];

    empList.push(emp);
    localStorage.setItem('empdata', JSON.stringify(empList));

    this.addActivity(`Added employee “${emp.name}”`, 'Add');
    alert('เพิ่มข้อมูลสำเร็จ!');
    this.router.navigate(['/employee']);
}
  addActivity(message: string, type: string) {
    const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    logs.unshift({
      message,
      type,
      time: new Date().toISOString()
    });
    localStorage.setItem('activityLogs', JSON.stringify(logs));
  }
}
