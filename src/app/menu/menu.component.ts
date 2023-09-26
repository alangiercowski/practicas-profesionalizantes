import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  logeado: boolean
  public constructor(){
    this.logeado = false
  }

  ngOnInit(){
    /*let logeadoStr = localStorage.getItem("logeadoStr") || ""
    if(logeadoStr === "t"){
      this.logeado = true
    }
    else{
      console.log(logeadoStr)
      this.logeado = false
    }

    console.log(this.logeado)*/
    if (localStorage.getItem("clave")===null){
      this.logeado = false
    }
    else{
      this.logeado = true
    }
    console.log(this.logeado)
  }

  public logOut(){
    localStorage.removeItem("clave")
    this.logeado = false;
  }
}
