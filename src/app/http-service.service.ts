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
    return this.http.post(this.urlApi + "/login", cuerpo);
  }

  getEventos(clave: string){
    const headers = new HttpHeaders().set("Authorization", clave)
    return this.http.get(this.urlApi + "/eventos", {"headers": headers});
  }

  getEvento(nombre: string, clave: string){
    const headers = new HttpHeaders().set("Authorization", clave)
    return this.http.get(this.urlApi + "/eventos/" + nombre, {"headers": headers});
  }

  postEvento(cuerpo: any, clave: string){
    const headers = new HttpHeaders().set("Authorization", clave)
    return this.http.post(this.urlApi + "/eventos", {"headers": headers}, cuerpo);
  }

  deleteEvento(nombre: string, clave: string){
    const headers = new HttpHeaders().set("Authorization", clave)
    return this.http.delete(this.urlApi + "/eventos/" + nombre, {"headers": headers})
  }

  putEvento(cuerpo: any, nombre: string, clave: string){
    const headers = new HttpHeaders().set("Authorization", clave);
    return this.http.put(this.urlApi + "/eventos/" + nombre, {"headers": headers}, cuerpo)
  }

  patchEvento(cuerpo: any, nombre: string, clave: string){
    const headers = new HttpHeaders().set("Authorization", clave);
    return this.http.patch(this.urlApi + "/eventos/" + nombre, {"headers": headers}, cuerpo)
  }
}