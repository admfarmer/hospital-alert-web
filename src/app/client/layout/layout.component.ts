import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  fullname: any;
  provcode: any;
  userType: any;

  constructor(private router: Router) {
    this.userType = sessionStorage.getItem('userType') || 'ADMIN';
    this.fullname = sessionStorage.getItem('fullname') || 'สถานีตำรวจภูธรเมืองอุบลราชธานี';
    this.provcode = sessionStorage.getItem('province') || '34';

  }

  ngOnInit() {
    // if (!this.fullname) {
    //   this.router.navigate(['/login']);

    // }
  }

  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('province');
    this.router.navigate(['/login']);
  }

}
