import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http-service.service';
@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent {
  eventoLocal: any
  nombreEvento: string
  evento: any;
  error: string
  url = "http://172.16.255.233:3000";

  constructor(private route: ActivatedRoute, private http: HttpService) {
    this.eventoLocal = {
      nombre: "local",
      fecha: "2000-01-21",
      fechaCierreConvocatoria: "2001-01-21",
      tags: ["a", "b"],
      usuarios: ["1", "2"],
      lugarDesarrollo:{
      direccion: "dir",
      foto: "ruta",
      nombre: "nombreLugar"
      }
    }
    this.evento = ""
    this.error = ""
    this.nombreEvento = ""
   }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.nombreEvento = params.get('nombre')!;
    });
    if(localStorage.getItem("clave") === null){
      this.error = "Necesita ingresar con una cuenta"
    }
    else{
      //@ts-ignore
      this.http.getEvento(this.nombreEvento).subscribe((data: any)=>{
        console.log(data);
        this.evento = data;
      })
    } 
  }
}