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
}