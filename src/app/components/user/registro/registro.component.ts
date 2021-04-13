import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { DocenteInterfaces } from 'src/app/models/docente-interfaces';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //docente: DocenteInterfaces = new DocenteInterfaces();
  registroFrom: FormGroup;
  hide = true;


  public docente : DocenteInterfaces = {
    id:"",
    nombreDocente: "",
    apellidoDocente: "",
    correoDocente: "",
    userDocente: "",
    passDocente: ""
  }


  constructor(
    private formBuilder: FormBuilder,
    private dataApi: DataApiService
  ) { }

  ngOnInit(): void {
    this.registroFrom = this.formBuilder.group({
      'nombreDocente': [this.docente.nombreDocente, [Validators.required]],
      'apellidoDocente': [this.docente.apellidoDocente, [Validators.required]],
      'correoDocente': [this.docente.correoDocente, [Validators.required, Validators.email]],
      'userDocente': [this.docente.userDocente, [Validators.required]],
      'passDocente': [this.docente.passDocente, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    });


  }


  onRegisterSubmit() {
    alert(this.docente.nombreDocente + ' ' + this.docente.correoDocente + ' ' + this.docente.passDocente);
    this.guardarDocente(this.docente);    
  }


  guardarDocente(docente) {
    console.log(docente);
    const post =
    {
      'id': this.docente.id,
      'nombreDocente': this.docente.nombreDocente,
      'apellidoDocente': this.docente.apellidoDocente,
      'correoDocente': this.docente.correoDocente,
      'userDocente': this.docente.userDocente,
      'passDocente': this.docente.passDocente
    };
    this.dataApi.guardarDocente(docente)
      .subscribe(response => {
        console.log(response);
        

      });
  }
}
