import { DatePipe,CurrencyPipe } from '@angular/common';
import { Component,input,output } from '@angular/core';


@Component({
  selector: 'tr[app-employeedata]',
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './employeedata.html',
  styleUrl: './employeedata.css'
})
export class Employeedata {
  id=input.required<number>();
  name=input.required<string>();
  joindate=input.required<Date>();
  position=input.required<string>();
  salary=input.required<number>();

  onDelete = output<number>();

  deleteItem(){
    if(confirm(`คุณต้องการลบข้อมูลพนักงานรหัส ${this.id()} หรือไม่?`)){
      console.log("ลบข้อมูล"+this.id())
      this.onDelete.emit(this.id())
    }
  }
}
