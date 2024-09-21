import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccoutService {
  private http = inject(HttpClient);
  baseUrl =  'https://localhost:5001/api/'
  currenUser = signal<User | null>(null);

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model)
    .pipe(
      map(user => {
        if (user)  {
          localStorage.setItem('user', JSON.stringify(user));
          this.currenUser.set(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model)
      .pipe(
        map(user => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currenUser.set(user);
          }
          
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currenUser.set(null);
  }
  
}
