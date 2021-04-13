import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute, Params } from '@angular/router'

import { MateriaInterfaces } from 'src/app/models/materia-interfaces';
import { ExperimentoInterfaces } from 'src/app/models/experimento-interfaces';
import { TemaInterfaces } from 'src/app/models/tema-interfaces';

import { EstudianteInterfaces } from 'src/app/models/estudiante-interfaces';
import { PracticasInterfaces } from 'src/app/models/practicas-interfaces';


import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-experimento',
  templateUrl: './experimento.component.html',
  styleUrls: ['./experimento.component.css']
})
export class ExperimentoComponent implements OnInit {


  //Variables de Boton Click
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;


  public experimento: ExperimentoInterfaces = {
    id: "",
    nombreExperimento: "",
    preguntaExperimento: "",
    idTema: ""
  }


  public tema: TemaInterfaces = {
    id: "",
    nombreTema: "",
    introduccionTema: "",
    instruccionesTema: "",
    bibliografiaTema: "",
    idMateria: ""
  }


  public materia: MateriaInterfaces = {
    id: "",
    nombreMateria: "",
    descripcionMateria: "",
    codigoMateria: "",
    idDocente: ""
  }

  estudiantes: any[] = [];


  public estudiante: EstudianteInterfaces = {
    id: "",
    nombreEstudiante: "",
    apellidoEstudiante: "",
    correoEstudiante: "",
    usuarioEstudiante: "",
    passEstudiante: ""
  }

  nombre = "";


  practicas: any[] = [];

  public practica: PracticasInterfaces = {
    id: "",
    idExperimento: "",
    idEstudiante: "",
    datoSensor: "",
    respuestaExperimento: "",
    fecha: ""
  }

  variMateria= "";
  variTema= "";

  constructor(
    private dataApi: DataApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }



ngOnInit(): void {
  const id = this.route.snapshot.params["id"];
  console.log("Entro: " + id)
    this.cargarUnExperimento(id);
}


cargarUnExperimento(id) {
  this.dataApi.cargarUnExperimento(id)
    .subscribe(
      experimento => {
        console.log(experimento)
        this.experimento = experimento;        
        this.cargarUnTema(this.experimento.idTema);
        this.variTema=this.experimento.idTema;
      }
    )
}


cargarUnTema(idTema) {
  console.log("Cod. Tema: " + idTema)
  this.dataApi.cargarUnTema(idTema)
    .subscribe(
      tema => {
        console.log(tema);
        const idMateria = tema['idMateria'];
        this.variMateria= idMateria;               
        this.cargarEstudiantes(idMateria);
      }
    )
}




//Botones de regreso
regresarMateria( ){
  console.log("Regresa a Materia")
  location.href="/home";
}

regresarTema(variMateria){
  console.log("Regresa a Tema" + variMateria)
  location.href="/tema/"+variMateria;
}


//Cargar lista de estudiantes
cargarEstudiantes(idMateria) {
  console.log("Codigo Materia: " + idMateria)
  this.dataApi.cargaListaIdEstudiante(idMateria)
    .subscribe(
      materiaEstudiante => {
        let longitud = (Object.keys(materiaEstudiante).length);
        const idEstudiante = materiaEstudiante[0]['idMateria'];

        for (let i = 0; i < longitud; i++) {
          let idEstudiante = materiaEstudiante[i]['idEstudiante'];
          this.dataApi.cargaDataEstudiantes(idEstudiante)
            .subscribe(
              async estudiante => {
                this.estudiantes.push(estudiante);
              }
            );
        }
      }
    )
}


practicasExperimento(idEstudiante){

  //Cargar Estudiante
  this.dataApi.cargaDataEstudiantes(idEstudiante)
    .subscribe(
      estudiante => {
        this.nombre = estudiante['nombreEstudiante'] + " " + estudiante['apellidoEstudiante']
      }
    )

  this.eliminar();
  this.dataApi.cargaDatosPracticas(idEstudiante)
    .subscribe(
      practica => {
        const id = this.route.snapshot.params["id"];

        let longitud = (Object.keys(practica).length);
        console.log(longitud);

        for (let i = 0; i < longitud; i++) {
          //let idExperimento = practica[i]['idExperimento'];
          if (practica[i]['idExperimento'] == id) {
            console.log("entro");
            console.log(practica[i]);
            this.practicas.push(practica[i]);
            console.log(this.practicas);
          } else {
            console.log("no entro")

          }
        }
      }
    )
}

eliminar() {
  this.practicas = [];
}

unaPractica(id){
  console.log(id)
  this.dataApi.cargaUnaPractica(id)    
  .subscribe(
    practica => {
      console.log(practica)
      this.practica = practica;
    }
  )
}
}
