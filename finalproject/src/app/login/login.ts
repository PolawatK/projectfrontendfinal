import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isActive = false;
  toggleRegister(){
    this.isActive = true;
  }
  toggleUser() {
    this.isActive = false;
  }
}
