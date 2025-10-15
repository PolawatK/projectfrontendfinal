import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  constructor(private router: Router) {}

  isActive = false;
  toggleRegister(){
    this.isActive = true;
  }
  toggleUser() {
    this.isActive = false;
  }

  signupUsers : any[] = [];

  signupObj : any = {
    username : '',
    email : '',
    password : ''
  };

  loginObj : any = {
    email : '',
    password : ''
  };

  ngOnInit(): void {
      const localData = localStorage.getItem('signupUsers');
      if(localData != null) {
        this.signupUsers = JSON.parse(localData);
      }
  }

  onSignup() {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      username : '',
      email : '',
      password : ''
    };

    alert('Register Successful');
    window.location.reload();
  }

  onLogin() {
    const isUserExist = this.signupUsers.find(m => m.email == this.loginObj.email && m.password == this.loginObj.password);
    if(isUserExist != undefined) {
      alert('Login Successful');
      localStorage.setItem('loggedInUser', JSON.stringify(isUserExist));  
      this.router.navigate(['/Dashboard']);
    } else {
      alert('Password or Email incorrect');
    }
  }
}