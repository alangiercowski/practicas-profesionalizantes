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
  @ViewChild('correoModificar') correoModificarInput: ElementRef;
  @ViewChild('pwModificarRes') pwModificarInputRes: ElementRef;
  @ViewChild('correoModificarRes') correoModificarInputRes: ElementRef;
  @ViewChild('pwModificar') pwModificarInput: ElementRef;

  error: string
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
    this.error = ""
    this.editar = false
    this.correoModificarInput = ElementRef.prototype
    this.pwModificarInput = ElementRef.prototype
    this.pwModificarInputRes = ElementRef.prototype
    this.correoModificarInputRes = ElementRef.prototype
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
    if(!estado){
      this.error = ""
    }
    this.editar = estado
  }

  modificarUsuario() {
    let correoNuevo = this.correoModificarInput.nativeElement.value
    let pwNueva = this.pwModificarInput.nativeElement.value
    if(correoNuevo == "" && pwNueva == ""){
      correoNuevo = this.correoModificarInputRes.nativeElement.value
      pwNueva = this.pwModificarInputRes.nativeElement.value
      if(correoNuevo =="" && pwNueva == ""){
        this.error = "no hay cambios"
      }
    }
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
    if(this.error != "no hay cambios"){
      this.http.editarUsuario(cuerpo, localStorage.getItem("clave")!).subscribe({
        next: (data:any) =>{
          this.verEdicion(false)
          this.error = ""
          this.ngOnInit()
  
        },
        error: (error) =>{
          this.error = error.error
        }
      })
    }
  }
}