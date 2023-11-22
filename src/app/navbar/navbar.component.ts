import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logeado: boolean;
  tagsPuestos: any
  nombreUsuario: string

  constructor(private router: Router){
    this.logeado = false
    this.nombreUsuario = ""
  }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem("nombreUsuario")!
    this.tagsPuestos = localStorage.getItem("tags")
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
    this.tagsPuestos = tags
    localStorage.setItem("tags", tags)
    this.router.navigate([""])
    this.actualizar.emit()
  }

  @Output() actualizar = new EventEmitter()
}
