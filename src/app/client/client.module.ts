import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/client/home/home.component';
import { LayoutComponent } from 'src/app/client/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { JwtModule } from '@auth0/angular-jwt';

import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    SharedModule,
    ClarityModule,
    // JwtModule,
    BrowserAnimationsModule
  ]
})
export class ClientModule { }
