import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccoutService } from '../_services/accout.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model: any = {};
  accountService = inject(AccoutService);
  
  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        console.log(error.error);
        console.log(error);
      }
    });
  }

  logout() {
    this.accountService.logout();
  }
}
