import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login implements OnInit {
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
  }

  onLogin() {
    const isUserExist = this.signupUsers.find(m => m.email == this.loginObj.email && m.password == this.loginObj.password);
    if(isUserExist != undefined) {
      alert('Login Successful');
    } else {
      alert('Invalid Credentials');
    }
  }

}
