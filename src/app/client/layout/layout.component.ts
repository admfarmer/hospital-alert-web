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
    this.userType = sessionStorage.getItem('userType');
    this.fullname = sessionStorage.getItem('fullname');
    this.provcode = sessionStorage.getItem('province');

  }

  ngOnInit() {
    if (!this.fullname) {
      this.router.navigate(['/login']);

    }
  }

  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('province');
    this.router.navigate(['/login']);
  }

}
