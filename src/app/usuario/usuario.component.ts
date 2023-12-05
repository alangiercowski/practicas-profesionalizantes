import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../http-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

interface Tipo {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],

})

export class UsuarioComponent {
  @ViewChild('nombreModificar') nombreModificarInput: ElementRef;
  @ViewChild('correoModificar') correoModificarInput: ElementRef;
  @ViewChild('pwModificar') pwModificarInput: ElementRef;
  @ViewChild('fotoModificar') fotoModificarInput: ElementRef;

  err: string
  usuario: any
  url = "http://localhost:3000/imagenes"
  editar: boolean
  nombreEditar = ""
  correoEditar = ""
  success: boolean
  archivoAporte!: File
  fotoPerfil: any = ""
  aportesUsuario: any = []
  constructor(private http: HttpService, public sanitizer: DomSanitizer, private router: Router) {
    this.success = false;
    this.usuario = ""
    this.err = ""
    this.editar = false
    this.nombreModificarInput = ElementRef.prototype
    this.correoModificarInput = ElementRef.prototype
    this.pwModificarInput = ElementRef.prototype
    this.fotoModificarInput = ElementRef.prototype
  }

  tipos: Tipo[] = [
    { value: 'Adopcion', viewValue: 'Adopcion' },
    { value: 'Extravio', viewValue: 'Extravio' },
  ];
  @ViewChild('fotos') fileInput: any;
  selectedProfilePhoto!: File;
  onProfilePhotoSelected(event: any) {
    this.selectedProfilePhoto = event.target.files[0];
  }

  ngOnInit() {
    if (!localStorage.getItem("clave")) {
      this.router.navigate(["/login"])
    }
    this.http.getUserData(localStorage.getItem("clave")!, localStorage.getItem("nombreUsuario")!).subscribe({
      next: (data: any) => {
        this.usuario = data;
        console.log(this.usuario)
        if(this.usuario.fotoPerfil == ""){
          console.log("no tiene foto")
          this.fotoPerfil="../../assets/fotoDefault.webp"
        }
        else{
          this.fotoPerfil = this.url+"/"+this.usuario.fotoPerfil
        }
        console.log(this.fotoPerfil)
      }
    })

    this.http.getContribucionesUsuario(localStorage.getItem("clave")!).subscribe({
      next: (data:any) =>{
        console.log(data)
        this.aportesUsuario = data
      }
    })
  }

  verEdicion(estado: boolean) {
    this.editar = estado
  }

  modificarUsuario() {
    const correoNuevo = this.correoModificarInput.nativeElement.value
    const pwNueva = this.pwModificarInput.nativeElement.value
    var cuerpo = new FormData()
    if(correoNuevo){
      console.log("hay correo")
      cuerpo.append("correo", correoNuevo)
    }
    if(pwNueva){
      cuerpo.append("contra", pwNueva)
      console.log("hay pw")
    }
    if(this.selectedProfilePhoto){
      console.log("hay foto")
      const extension = this.selectedProfilePhoto.name.split('.').pop();
      const type = 'image/${extension}';
      const blob = new Blob([this.selectedProfilePhoto], { type });
      cuerpo.append('fotoPerfil', blob, this.selectedProfilePhoto.name);
      console.log("blob")
      console.log(blob)
      console.log(this.selectedProfilePhoto.name)
    }
    this.http.editarUsuario(cuerpo, localStorage.getItem("clave")!).subscribe({
      next: (data:any) =>{
        this.verEdicion(false)
        this.ngOnInit()
      }
    })
  }
}