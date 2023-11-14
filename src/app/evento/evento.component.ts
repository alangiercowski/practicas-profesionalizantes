import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http-service.service';
@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent {
  nombre: string;
  nombreLugar: string;
  direccion: string;
  tags: Array<string>;
  fotoLugar: string;
  fecha: string;
  fechaConvocatoria: string;
  descripcion: string;
  login: boolean;
  click: boolean;

  constructor(private route: ActivatedRoute, private http: HttpService) {
    this.nombre = "Exposicion de proyectos de 4to computacion";
    this.nombreLugar = "Teatro colon";
    this.direccion = "Cerrito 628, C1010AAN CABA";
    this.tags = ["Computacion", "Robotica", "Tecnologia", "Programacion"];
    this.fotoLugar = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Buenos_Aires_Teatro_Colon_2.jpg/800px-Buenos_Aires_Teatro_Colon_2.jpg";
    this.fecha = "23/02/2023";
    this.fechaConvocatoria = "13/02/2023";
    this.descripcion = 'Auxilio mi familia esta en peligro, un grupo de cumbia santafesina que ha dejado su marca en la escena musical argentina. Su historia musical es una mezcla de talento, pasión y una energía arrolladora que ha conquistado a fans de todo el país. La historia de Q Lokura comenzó en la ciudad de Santa Fe, donde un grupo de amigos decidió formar una banda con el objetivo de llevar la cumbia a un nivel superior. Desde sus inicios, la banda se destacó por su estilo frresco y contagioso, combinando la cumbia tradicional con influencias de otros géneros musicales. Esto les permitió destacarse en un mercado musical altamente competitivo. Con el tiempo, Q Lokura lanzó varios álbumes que se convirtieron en verdaderos éxitos en la escena de la cumbia argentina. Temas como "La Q Lokura no es cuestión de suerte" y "La negra se menea" se convirtieron en himnos en las pistas de baile de todo el país. La banda ha demostrado una habilidad innata para conectar con su público a través de letras pegajosas y ritmos irresistibles. El próximo show de Q Lokura promete ser un evento inolvidable. Con su característico estilo enérgico y su puesta en escena de alta calidad, la banda se prepara para hacer vibrar a sus seguidores en una noche llena de música y baile. El show contará con invitados especiales y sorpresas que harán que el público se entregue por completo a la fiesta. ¡No te quedes afuera de esta fiesta que promete ser un verdadero agite!';
    this.login = false;
    this.click = false;
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: string = params.get('id')!;
      this.getEvento(id);
    });

    console.log(innerWidth)
  }

  getEvento(id: string){
    this.http.getEvento(id).subscribe({
      next: (data) => {
        const evento = JSON.parse(JSON.stringify(data));
        console.log(evento)

        this.nombre = evento.nombre;
        this.tags = evento.tags;
        this.fecha = evento.fecha;
        this.fechaConvocatoria = evento.fechaCierreConvocatoria;

        this.http.getLugarEvento(evento.lugar).subscribe({
          next: (dataLugar) => {
            let lugar = JSON.parse(JSON.stringify(dataLugar));
            console.log(lugar);
            const rutaImagenes = lugar.urlImagenes;
            lugar = lugar.lugar;

            this.direccion = lugar.direccion;
            this.nombreLugar = lugar.nombre;
            this.fotoLugar = rutaImagenes + lugar.fotoLugar;
          },
          error: (error) => {
            console.log(error);
          }
        })
      },
      error: (error) => {
        alert("No se puedo recibir el evento");
        console.log(error)
      }
    })

  }

  @HostListener('mouseenter')
  onMouseEnter() {
    let miDiv: any = document.getElementById('tags');
    if (miDiv) {
      miDiv.addEventListener('wheel', this.handleMouseWheel);
    }
  }
 
  @HostListener('mouseleave')
  onMouseLeave() {
    let miDiv: any = document.getElementById('tags');
    if (miDiv) {
      miDiv.removeEventListener('wheel', this.handleMouseWheel);
    }
  }

  private handleMouseWheel(event: WheelEvent) {
    let miDiv: any = document.getElementById('tags');
    if (miDiv) {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      miDiv.scrollLeft += delta * 150; // Ajusta la velocidad de desplazamiento
    }
  }
}