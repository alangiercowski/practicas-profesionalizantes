import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  urlApiImagenes = 'http://localhost:3000/imagenes/';
  logeado: boolean;
  usuarios: boolean;
  mensajeIngresoAdmin: string;
  eventos: boolean;
  admins: boolean;
  direccionSeleccionada: string = '';
  mensajeVerLugar: string;
  lugares: boolean;
  lugar: any;
  listaDelugares: any;
  botonAdmins: boolean
  getListaLugar: boolean;
  mensajeIngresoUsuario: string;
  mensajeBorrarUsuario: string;
  getInvestigadores: boolean;
  getAdministradores: boolean;
  getListaLugares: boolean;
  listaInvestigadores: any;
  listaAdministradores: any;
  listaLugares: any;
  esSuper: boolean;
  mensajeIngresoLugares: string;
  mensajeGetLugares: boolean;
  mensajeModificarUsuario: string;
  selectedPhoto!: File;
  selectedPhotoLugar!: File;
  mensajeBorrarLugar: string;

  constructor(private http: HttpService) {
    this.logeado = false
    this.usuarios = false
    this.direccionSeleccionada = '';
    this.getListaLugar = false
    this.mensajeIngresoAdmin = "",
    this.eventos = false
    this.admins = false
    this.botonAdmins = false
    this.mensajeIngresoUsuario = "";
    this.mensajeBorrarUsuario = ""
    this.getInvestigadores = false
    this.esSuper = false
    this.getAdministradores = false
    this.lugares = false
    this.mensajeModificarUsuario = "";
    this.mensajeIngresoLugares = ""
    this.mensajeBorrarLugar = ""
    this.getListaLugares = false
    this.mensajeGetLugares = false
    this.mensajeVerLugar = ""

  }

  onFileSelected(event: any) {
    this.selectedPhoto = event.target.files[0];
  }
  onFileSelectedLugar(event: any) {
    this.selectedPhotoLugar = event.target.files[0];
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
    this.eventos = false;
    this.admins = false;
    this.lugares = false;
  }

  verEventos() {
    this.eventos = true;
    this.usuarios = false;
    this.admins = false;
    this.lugares = false;
  }

  verAdmins() {
    this.admins = true;
    this.usuarios = false;
    this.eventos = false;
    this.lugares = false;
  }
  verLugares() {
    this.lugares = true;
    this.usuarios = false;
    this.eventos = false;
    this.admins = false;
  }


  ingresarInvestigador(nombre: string, correo: string, contraseña: string) {
    //@ts-ignore
    var cuerpo = new FormData();
    cuerpo.append("nombre", nombre)
    cuerpo.append("correo", correo)
    cuerpo.append("contrasenia", contraseña)
    if (this.selectedPhoto) {
      const extension = this.selectedPhoto.name.split('.').pop();
      const type = 'image/${extension}';
      const blob = new Blob([this.selectedPhoto], { type });
      cuerpo.append('fotoPerfil',blob, this.selectedPhoto.name);
    }

      return this.http.ingresarUsuario(cuerpo).subscribe({
        next: (data) => {
          console.log(data)
          this.mensajeIngresoUsuario = "Usuario ingresado correctamente"
        },
        error: (error) => {
          console.log(error)
          this.mensajeIngresoUsuario = error.error
          if (error.status == 413) {
            console.log("muy pesao")
          }
        }
      });
    }

  borrarLugar(nombre: string) {
    console.log(nombre)
    return this.http.borrarLugar(nombre).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeBorrarLugar = "Lugar borrado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeBorrarLugar = error.error
      }
    });
  }
  
  borrarInvestigador(nombre: string) {
    return this.http.borrarUsuario(nombre).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeBorrarUsuario = "Usuario borrado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeBorrarUsuario = error.error
      }
    });

  }
  verInvestigadores() {

    if (this.getInvestigadores) {
      this.getInvestigadores = false;
    }
    else {
      this.getInvestigadores = true;

      return this.http.verUsuarios().subscribe({
        next: (data) => {
          console.log(data)
          this.listaInvestigadores = data
        },
        error: (error) => {
          console.log(error)
        }
      })
    }

    return 0

  }
  ingresarInvestigadores(nombre: string, contraseña: string) {

    var body = {
      nombre: nombre,
      contraseña: contraseña,
      esSuper: this.esSuper
    }

    return this.http.ingresarAdministrador(body).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeIngresoAdmin = "Administrador ingresado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeIngresoAdmin = error.error
      }
    })
  }
  modificarInvestigador(nombre: string, correo: string, contraseña: string) {
      
      var body = {
        correo: correo,
        contraseña: contraseña
      }
  
      return this.http.modificarUsuario(nombre, body).subscribe({
        next: (data) => {
          console.log(data)
          this.mensajeModificarUsuario = "Investigador modificado correctamente"
        },
        error: (error) => {
          console.log(error)
          this.mensajeModificarUsuario = error.error
        }
      })
  }
  seleccionarOpcion(event: any) {
    const indiceSeleccionado = event.target.value;
    console.log("Opción seleccionada:", this.listaDelugares[indiceSeleccionado]);
    this.direccionSeleccionada = this.listaDelugares[indiceSeleccionado];
  }
  ingresarLugar(nombre: any, direccion: any){

    var cuerpo = new FormData();
    cuerpo.append("nombre", nombre)
    cuerpo.append("direccion", direccion)
    if (this.selectedPhotoLugar) {
      const extension = this.selectedPhotoLugar.name.split('.').pop();
      const type = 'image/${extension}';
      const blob = new Blob([this.selectedPhotoLugar], { type });
      cuerpo.append('fotoLugar',blob, this.selectedPhotoLugar.name);
    }

    return this.http.ingresarLugar(cuerpo).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeIngresoLugares = "Lugar ingresado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeIngresoLugares = error.error
      }
    })

  }
  audisio() {
    this.esSuper = !this.esSuper
    console.log(this.esSuper)
    var boton = document.getElementById("botonSuper")
    if (this.esSuper) {
      boton?.setAttribute("class", "btn btn-success")
    }
    else {
      boton?.setAttribute("class", "btn btn-danger")
    }

  }
  borrarAdministrador(nombre: string) {
    return this.http.borrarAdministrador(nombre).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeBorrarUsuario = "Administrador borrado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeBorrarUsuario = error.error
      }
    })
  }
  verAdministradores() {
    if (this.getAdministradores) {
      this.getAdministradores = false;
    }
    else {
      this.getAdministradores = true;

      return this.http.getAdministradores().subscribe({
        next: (data) => {
          console.log(data)
          this.listaAdministradores = data
        },
        error: (error) => {
          console.log(error)
        }
      })
    }

    return 0
  }
  getLugares(){
    if (this.getListaLugares) {
      this.getListaLugares = false;
    }
    else {
      this.getListaLugares = true;
    }
    return this.http.getLugares().subscribe({
      next: (data) => {
        if(JSON.parse(JSON.stringify(data)).lugares == null){
          this.mensajeGetLugares = true
        }
        console.log(data)
        this.listaLugares = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getLugar(id: any){
    if(this.getListaLugar){
      this.getListaLugar = false
    }
    else{
      this.getListaLugar = true
    }
    return this.http.getLugar(id).subscribe({
      next: (data) => {
        this.lugar = data 
        console.log(data)
      },
      error: (error) => {
        console.log(error)
        this.mensajeVerLugar = error.error
      }
    })
  }
}
