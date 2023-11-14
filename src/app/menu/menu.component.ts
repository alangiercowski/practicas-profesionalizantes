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
  eventoLocal: any
  public constructor(private renderer: Renderer2, private http: HttpService) {
    this.logeado = false
    this.error = ""
    this.eventos = ""
    this.eventoLocal = {
      nombre: "local cuyo nombre es tan largo que no entra",
      fecha: "2000-01-21",
      fechaCierreConvocatoria: "2001-01-21",
      tags: ["a", "b", "c", "d"],
      usuarios: ["1", "2"],
      lugarDesarrollo: {
        direccion: "dir",
        foto: "ruta",
        nombre: "nombreLugar"
      }
    }
  }

  ngOnInit() {
    if (localStorage.getItem("clave") === null) {
      this.logeado = false
    }
    else {
      this.logeado = true
      var clave = localStorage.getItem("clave")
    }
    if (localStorage.getItem("tags") === null || localStorage.getItem("tags") == "") {
      //@ts-ignore
      this.http.getEventos().subscribe({
        next: (data) => {
          this.eventos = data
          console.log(data)
        },
        error: (error) => {
          this.error = error.error
        }
      })
    }
    else {
      //@ts-ignore
      this.http.getEventosTags(localStorage.getItem("tags")).subscribe({
        next: (data) => {
          this.eventos = data
          console.log(data)
        },
        error: (error) => {
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
