import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from "src/environments/environment.prod";

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/home/home.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AlertService } from 'src/app/shared/alert.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
