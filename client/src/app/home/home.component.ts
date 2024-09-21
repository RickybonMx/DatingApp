import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;
  
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: respose => this.users = respose,
      error: error => console.log(error),
      complete: () => console.log('Request completed.')
    });
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
