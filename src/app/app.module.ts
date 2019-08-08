import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from "src/environments/environment.prod";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientModule } from 'src/app/client/client.module';
import { LoginModule } from 'src/app/login/login.module';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

export const whitelistedDomains = [new RegExp('[\s\S]*')] as RegExp[];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ClientModule,
    LoginModule,
    JwtModule,
    BrowserAnimationsModule,
    SharedModule,
    ClientModule,
    HttpClientModule,
    LoginModule

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  { provide: 'API_URL', useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
