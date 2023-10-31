import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core'
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  logeado: boolean
  error: string
  eventos: any
  public constructor(private renderer: Renderer2, private http: HttpService) {
    this.logeado = false
    this.error = ""
    this.eventos = "" 
  }

  generarEventos() {
    console.log("eventos:    " + this.eventos)
  }

  ngOnInit() {
    if (localStorage.getItem("clave") === null) {
      this.logeado = false
    }
    else {
      this.logeado = true
      var clave = localStorage.getItem("clave")
      //@ts-ignore
      this.http.getEventos(clave).subscribe({
        next:(data) =>{
          this.eventos = data
        },
        error: (error)=>{
          this.error = error.error
        }
      })
    }
  } 

  

  public logOut() {
    localStorage.removeItem("clave")
    this.logeado = false;
  }
}
