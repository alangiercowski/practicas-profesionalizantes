import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logeado: boolean;

  constructor(){
    this.logeado = false
  }

  ngOnInit() {
    if (localStorage.getItem("clave") === null) {
      this.logeado = false
    }
    else {
      this.logeado = true
    }
  }

  public logOut() {
    localStorage.removeItem("clave")
    this.logeado = false;
  }
}
