import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

logeado:boolean;
usuarios:boolean;
eventos:boolean;
admins:boolean;
botonAdmins:boolean
errorUsuario: string

constructor(){
  this.logeado = false
  this.usuarios = false
  this.eventos = false
  this.admins = false
  this.botonAdmins = false
  this.errorUsuario = ""
}

ngOnInit(){
  if(localStorage.getItem("clave") != null){
    console.log('Ya esta logeado');
    this.logeado=true ;
    console.log(this.logeado)
    console.log(localStorage.getItem("esSuper"))
  }
  if(localStorage.getItem("esSuper") == "true"){
    this.botonAdmins = true 
  }
}

cerrarSesion(){
  localStorage.clear();
  window.location.reload()
}
aver(foto: any){
  console.log(foto)
}

verUsuarios()
{
  this.usuarios = true;
}

verEventos(){
  this.eventos = true;
}

verAdmins(){
  this.admins = true;
}
}
