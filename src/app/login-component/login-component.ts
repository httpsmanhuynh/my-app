import { Component } from '@angular/core';
import { UserLogin } from '../classes/UserLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  // Khởi tạo model để binding
  user = new UserLogin();
  constructor(private router: Router) {}

  onLogin() {
    console.log('Thông tin đăng nhập:', this.user);
    localStorage.setItem('isLoggedIn', 'true');
    let infor = JSON.stringify(this.user);
    alert('Xử lý đăng nhập:\n' + infor);
    this.router.navigate(['/lazyinfo']);
  }
  onLogout() {
    localStorage.removeItem('isLoggedIn');

    this.user = new UserLogin();

    alert('Đã đăng xuất!');

    this.router.navigate(['/login']);
  }
}
