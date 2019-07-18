import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from 'src/app/shared/auth-guard.service';
import { LoginService } from 'src/app/shared/login.service';
import { AlertService } from 'src/app/shared/alert.service';
import { SweetAlertService } from 'src/app/shared/sweetalert.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [
    AuthGuardService,
    LoginService,
    AlertService,
    SweetAlertService
  ]
})
export class SharedModule { }
