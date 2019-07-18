import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { SweetAlertService } from '../shared/sweetalert.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  hosname: string;
  hoscode: string;
  // topic: string;

  jwtHelper = new JwtHelperService();

  constructor(
    private loginService: LoginService,
    private sweetAlertService: SweetAlertService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  async doLogin() {
    if (this.username && this.password) {
      try {
        const rs: any = await this.loginService.doLogin(this.username, this.password);
        console.log(rs.token);

        if (rs.token) {
          const token = rs.token;
          sessionStorage.setItem('token', token);
          const decoded: any = this.jwtHelper.decodeToken(token);
          // console.log(decoded);

          sessionStorage.setItem('fullname', decoded.fullname);
          sessionStorage.setItem('userType', decoded.userType);
          sessionStorage.setItem('province', decoded.province);
          // this.router.navigate(['/display']);
          this.router.navigate(['/client']);
        } else {
          const message = rs.message || 'เกิดข้อผิดพลาด';
          this.sweetAlertService.error(message);
        }
      } catch (error) {
        console.log(error);
        this.sweetAlertService.error('เกิดข้อผิดพลาด');
      }
    } else {
      this.sweetAlertService.error('เกิดข้อผิดพลาด');
    }

  }

}
