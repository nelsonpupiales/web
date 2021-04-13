import { Component, OnInit, ViewChild } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

import { FormControl, FormGroup, Validators } from "@angular/forms";



import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { MateriaInterfaces } from 'src/app/models/materia-interfaces';
import { TemaInterfaces } from 'src/app/models/tema-interfaces';
import { EstudianteInterfaces } from 'src/app/models/estudiante-interfaces';




@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {



  message = '';
  registroTemaFrom: FormGroup;
  hide = true;
  codMateria='';

  public materia: MateriaInterfaces = {
    id: "",
    nombreMateria: "",
    descripcionMateria: "",
    codigoMateria: "",
    idDocente: ""

  }

  temas = null;

  public tema: TemaInterfaces = {
    id: "",
    nombreTema: "",
    introduccionTema: "",
    instruccionesTema: "",
    bibliografiaTema: "",
    idMateria: ""
  }


  public estudiante: EstudianteInterfaces = {
    id: "",
    nombreEstudiante: "",
    apellidoEstudiante: "",
    correoEstudiante: "",
    usuarioEstudiante: "",
    passEstudiante: ""
  }


  estudiantes: any[] = [];


  constructor(
    private dataApi: DataApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,    
  ) {

    this.observar()
  }



  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    console.log("Entro: " + id)
    this.cargarUnaMateria(id);
    this.cargarTemas(id);
    this.message = '';

    //Validar boton del formulario de guardar materia 
    this.registroTemaFrom = this.formBuilder.group({
      'nombreTema': [this.tema.nombreTema, [Validators.required]],
    });


  }


  onRegisterSubmit() {
    console.log(this.tema)
  }


  //Carga una materia
  cargarUnaMateria(id) {
    this.dataApi.detalleUnaMateria(id)
      .subscribe(
        materia => {
          console.log(materia)
          this.materia = materia;
          this.codMateria= this.materia.id;
        }
      );
  }


  cargarTemas(idMateria) {
    this.dataApi.cargarTemas(idMateria)
      .subscribe(
        tema => {
          console.log(tema);
          this.temas = tema;
        });
  }


  //Actualizar Tema
  actualizarTema(id) {
    this.dataApi.cargarUnTema(id)
      .subscribe(
        tema => {
          console.log(tema);
          this.tema = tema;
        }
      );
  }



  //Actualizar materia
  actualizarMateria(id) {
    this.dataApi.detalleUnaMateria(id)
      .subscribe(
        materia => {
          console.log(materia)
          this.materia = materia;
        }
      );
  }


  //Borrar un Tema
  borrarTema(id) {
    if (confirm("Seguro quiere eliminar el Tema"))
      this.dataApi.borrarTema(id)
        .subscribe(data => {
          console.log(data)
          this.cargarTemas(this.materia.id);
          this.borrar();
        },
          error => console.log('ERROR: ' + error)
        );
  }



  id: string;
  nombreTema: string;
  introduccionTema: string;
  instruccionesTema: string;
  borrar() {
    console.log("Borrar")
    this.tema.id = '';
    this.tema.nombreTema = '';
    this.tema.introduccionTema = '';
    this.tema.instruccionesTema = '';
    this.tema.bibliografiaTema = '';
  }

  observar() {
    this.dataApi.usuarioObservable.subscribe((datosUser) => {
      console.log('datos de usaurio nueva ventana -> ', datosUser);
      // this.usuario = datosUser;

    })
  }



  logout() {
    this.dataApi.logOut()
    this.router.navigate(['/user/login'])
  }



  //Lista Estudiante
  listaEstudiante(codMateria){
    console.log("Carga Materia ->", codMateria)
    this.dataApi.cargaListaIdEstudiante(codMateria)
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
                  console.log(estudiante)
                }
              );
          }
        }
      )
    
  }



  //Boton regresar
  regresarMateria(){
    location.href="/home";
  }

  borrarModal(){
    console.log("Borrar");
    this.estudiantes.length = 0;
          
  } 




}
