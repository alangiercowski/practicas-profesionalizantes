import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpService } from '../http-service.service';
import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

const fbConfig = {
  apiKey: "AIzaSyDVOMc24POg6wNOO-WU3YKixGI4VPctRc8",
  authDomain: "pract-83206.firebaseapp.com",
  projectId: "pract-83206",
  storageBucket: "pract-83206.appspot.com",
  messagingSenderId: "223218284293",
  appId: "1:223218284293:web:10ab6e945dd7d4b12ee96c"
};

const app = initializeApp(fbConfig)
const provider = new GoogleAuthProvider()
const auth = getAuth()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error: string

  constructor(private http: HttpService, private router: Router){
    this.error = ""
  }

  public login(nombre: string, contraseña: string){
    var cuerpo = {
      nombre : nombre,
      contraseña : contraseña
    }
    return this.http.login(cuerpo).subscribe({
      next: (data) => {
        console.log(data)
        localStorage.setItem("clave", JSON.parse(JSON.stringify(data)).claveJWT)
        localStorage.setItem("esSuper", JSON.parse(JSON.stringify(data)).esSuper)
        this.router.navigate([""])
      },
      error: (error) => {
        console.log(error)
        this.error = error.error
      }
    });
  }
  public loginGoogle(){
    signInWithPopup(auth, provider).then((r) => {
      const credential = GoogleAuthProvider.credentialFromResult(r)
      const token = credential?.accessToken
      const usr = r.user
      this.router.navigate([""])
    }).catch((error)=>{
      const errCode = error.errCode
      const errMessage = error.errMessage
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
    })
  }

}
