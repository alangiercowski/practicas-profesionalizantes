import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logeado: boolean;

  constructor(private router: Router){
    this.logeado = false
  }

  ngOnInit() {
    console.log(localStorage.getItem("clave"))
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

  public buscarPorTags(tags: string){
    localStorage.setItem("tags", tags)
    this.router.navigate([""])
  }
}
