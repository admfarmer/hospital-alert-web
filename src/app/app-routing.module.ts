import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component'
import { LayoutComponent } from 'src/app/layout/layout.component'

const routes: Routes = [
  { path: '', redirectTo: 'client/home', pathMatch: 'full' },
  {
    path: 'client', component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
