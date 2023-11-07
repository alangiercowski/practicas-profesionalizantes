import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';


@Injectable({
providedIn:  'root'
})

export class HttpService {

  private urlApi = 'http://172.16.255.233:3000';

  constructor(private http: HttpClient) { }

  registrarse(cuerpo: any) {
    return this.http.post(this.urlApi + "/registrarse", cuerpo);
  }

  login(cuerpo: any){
    return this.http.post(this.urlApi + "/LoginAdministrador", cuerpo);
  }

  ingresarUsuario(cuerpo: any){
    return this.http.post(this.urlApi + "/investigadores", cuerpo, {headers: {Authorization: localStorage["clave"]}});
  }

  borrarUsuario(nombre: any){
    return this.http.delete(this.urlApi + "/investigadores/" + nombre,{headers: {Authorization: localStorage["clave"]}});
  }

  verUsuarios(){
    return this.http.get(this.urlApi + "/investigadores",{headers: {Authorization: localStorage["clave"]}});
  }

  ingresarAdministrador(cuerpo: any){
    return this.http.post(this.urlApi + "/administradores", cuerpo, {headers: {Authorization: localStorage["clave"]}});
  }
  borrarAdministrador(nombre: any){
    return this.http.delete(this.urlApi + "/administradores/" + nombre,{headers: {Authorization: localStorage["clave"]}});
  }
  getAdministradores(){
    return this.http.get(this.urlApi + "/administradores",{headers: {Authorization: localStorage["clave"]}});
  }
  ingresarLugar(cuerpo: any){
    return this.http.post(this.urlApi + "/lugares",cuerpo ,{headers: {Authorization: localStorage["clave"]}});
  }
  borrarLugar(nombre: any){
    return this.http.delete(this.urlApi + "/lugares/" + nombre,{headers: {Authorization: localStorage["clave"]}});
  }
}