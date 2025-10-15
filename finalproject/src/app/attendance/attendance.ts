import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  imports: [FormsModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class Attendance {
  attendance: { [key: number]: string } = {};

  saveAttendance() {
    const today = new Date().toISOString().split('T')[0];
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
  }

  
}
