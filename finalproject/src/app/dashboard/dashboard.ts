import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  username: string = 'Guest';

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
    }
  }
}