import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    component: MenuComponent,
    title: "menu"
  },
  {
    path: "register",
    component: RegisterComponent,
    title: "Registro"
  },{
    path: "login",
    component: LoginComponent,
    title: "Inicio Sesion"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
