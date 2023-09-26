import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: String

  constructor(private http: HttpService, private router: Router){
    this.error=""
  }

  public login(nombre: String, pw: String){
    var cuerpo = {
      nombre: nombre,
      contraseña: pw
    }
    return this.http.login(cuerpo).subscribe({
      next: (data) =>{
        console.log(data)
        localStorage.setItem("clave", JSON.parse(JSON.stringify(data)).claveJWT)
        //localStorage.setItem("logeadoStr", "t")
        this.router.navigate([""])
      },
      error: (error)=>{
        console.log(error)
        this.error = "Error: " + error.error
      }
    })
  }
}
