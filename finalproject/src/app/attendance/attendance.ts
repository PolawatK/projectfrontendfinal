import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

export interface AttendanceRecord {
  empId: number;        
  status: 'Present' | 'Leave' | 'Absent';  
}
export interface AttendanceDay {
  date: string;                
  records: AttendanceRecord[]; 
}

@Component({
  selector: 'app-attendance',
  imports: [FormsModule,NgFor],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class Attendance {
  empList = signal<any[]>([]);
  attendance: { [key: number]: string } = {};
  today = new Date().toISOString().split('T')[0];
  ngOnInit() {
    const data = localStorage.getItem('empdata');
    this.empList.set(data ? JSON.parse(data) : []);
  }

  saveAttendance() {
    const today = this.today;
    const records: AttendanceRecord[] = Object.entries(this.attendance).map(([id, status]) => ({
      empId: Number(id),
      status: status as 'Present' | 'Leave' | 'Absent'
    }));
    const allData: AttendanceDay[] = JSON.parse(localStorage.getItem('attendance') || '[]');
    const existing = allData.find((d) => d.date === today);
    if (existing) {
      existing.records = records;
    } else {
      allData.push({ date: today, records });
    }
    localStorage.setItem('attendance', JSON.stringify(allData));
    alert('บันทึกข้อมูลเช็กชื่อเรียบร้อย!');
    records.forEach(r => {
    const emp = this.empList().find(e => e.id === r.empId);
   if (emp) {
    const message = `On ${r.status} “${emp.name}”`;
    this.addActivity(message, r.status);
    }
  });
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
