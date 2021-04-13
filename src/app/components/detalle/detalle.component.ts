import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute, Params, Router, CanActivate } from '@angular/router'
import { TemaInterfaces } from 'src/app/models/tema-interfaces';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { NgModule } from '@angular/core';
import { MateriaInterfaces } from 'src/app/models/materia-interfaces';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  formdata;

  public tema: TemaInterfaces = {
    id: "",
    nombreTema: "",
    introduccionTema: "",
    instruccionesTema: "",
    bibliografiaTema: "",
    idMateria: "",
  }


  public materia: MateriaInterfaces = {
    id: "",
    nombreMateria: "",
    descripcionMateria: "",
    codigoMateria: "",
    idDocente: ""

  }

  data: any;

  constructor(
    private dataApi: DataApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }


  onClickSubmit(data) {   

    if (this.formdata.invalid) {
      this.formdata.get('nombreTema').markAsTouched();
      this.formdata.get('introduccionTema').markAsTouched();
      this.formdata.get('instruccionesTema').markAsTouched();
      this.formdata.get('bibliografiaTema').markAsTouched();
    }
    console.log(data)
    //console.log(this.formdata.value.description1);
    this.guardatTema(data)
  }

  ngOnInit(): void {

    //Carga el ID de materia
    const id = this.route.snapshot.params["id"];
    this.materia.id = id;    
    this.cargarMateria(id)


    //Validar Formulario
    this.formdata = this.formBuilder.group({
      nombreTema: ['', [Validators.required]],
      introduccionTema: ['', [Validators.required, Validators.maxLength(3000), Validators.minLength(5)]],
      instruccionesTema: ['', [Validators.required, Validators.maxLength(3000), Validators.minLength(5)]],
      bibliografiaTema: ['', [Validators.required, Validators.maxLength(3000), Validators.minLength(5)]]
    });
  }


  //Cargar Nombre de Materia
  cargarMateria(id){
    console.log("Entro " + id)
    this.dataApi.detalleUnaMateria(id)
      .subscribe(
        materia => {
          console.log(materia)
          this.materia = materia;
        }
      );
  }


  //Guardar Tema
  guardatTema(data) {
    console.log(data)
    var nombreTema = this.formdata.value.nombreTema
    var introduccionTema = this.formdata.value.introduccionTema
    var instruccionesTema = this.formdata.value.instruccionesTema
    var bibliografiaTema = this.formdata.value.bibliografiaTema
    const post =
    {
      'id': this.formdata.value.id,
      'nombreTema': nombreTema,
      'introduccionTema': introduccionTema,
      'instruccionesTema': instruccionesTema,
      'bibliografiaTema': bibliografiaTema,
      'idMateria': this.materia.id
    };
    this.dataApi.guardarTema(post)
      .subscribe(
        response => {
          console.log(post.idMateria);
          this.router.navigate(['../tema/' + post.idMateria]);
        }
      )
  }
}
















