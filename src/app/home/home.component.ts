import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  logeado: boolean;
  usuarios: boolean;
  eventos: boolean;
  admins: boolean;
  botonAdmins: boolean
  errorUsuario: string

  constructor(private http: HttpService) {
    this.logeado = false
    this.usuarios = false
    this.eventos = false
    this.admins = false
    this.botonAdmins = false
    this.errorUsuario = ""
  }

  ngOnInit() {
    if (localStorage.getItem("clave") != null) {
      console.log('Ya esta logeado');
      this.logeado = true;
      console.log(this.logeado)
      console.log(localStorage.getItem("esSuper"))
    }
    if (localStorage.getItem("esSuper") == "true") {
      this.botonAdmins = true
    }
  }

  cerrarSesion() {
    localStorage.clear();
    window.location.reload()
  }
  aver(foto: any) {
    console.log(foto)
  }

  verUsuarios() {
    this.usuarios = true;
  }

  verEventos() {
    this.eventos = true;
  }

  verAdmins() {
    this.admins = true;
  }

  toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  })
  async verString64() {
    //@ts-ignore
    const file = document.getElementById("foto")?.files[0]
    console.log(await this.toBase64(file));
  }

  ingresarUsuario(nombre: string, correo: string, contraseña: string) {
    //@ts-ignore
    const file = document.getElementById("foto")?.files[0]
    this.toBase64(file).then((v) => {
      var cuerpo = {
        nombre: nombre,
        correo: correo,
        contraseña: contraseña,
        nombreUsuario: localStorage.getItem("nombreUsuario"),
        fotoPerfil: v
      }

      return this.http.ingresarUsuario(cuerpo).subscribe({
        next: (data) => {
          console.log(data)
        },
        error: (error) => {
          console.log("epico")
          console.log(error)
          if(error.status == 413){
            console.log("muy pesao")
          }
        }
      });
    })
  }
}
