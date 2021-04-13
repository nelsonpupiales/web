import { Component, OnInit } from '@angular/core';

import { DataApiService } from 'src/app/services/data-api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DocenteInterfaces } from 'src/app/models/docente-interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  registroFrom: FormGroup;
  hide = true;

  public docente: DocenteInterfaces = {
    id: "",
    nombreDocente: "",
    apellidoDocente: "",
    correoDocente: "",
    userDocente: "",
    passDocente: ""
  }

  public user: " ";


  constructor(
    private formBuilder: FormBuilder,
    private dataApi: DataApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registroFrom = this.formBuilder.group({
      'userDocente': [this.docente.userDocente, [Validators.required]],
      'passDocente': [this.docente.passDocente, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    });
  }

  onRegisterSubmit() {
    //alert(this.docente.userDocente + ' ' + this.docente.passDocente);
    this.loginDocente(this.docente);
  }

  loginDocente(docente) {
    console.log(docente);
    var userDocente = this.docente.userDocente
    var passDocente1 = this.docente.passDocente

    //Consulta el USER
    this.dataApi.loginUser(userDocente)
      .subscribe(
        docente => {
          console.log(docente);
          if (docente == null) {
            alert("No se encontro Usuario");
          }
          else {
            this.loginPass(passDocente1)

          }
        }
      );
  }


  loginPass(passDocente1) {
    this.dataApi.loginPass(passDocente1)
      .subscribe(
        docente => { 
          console.log(docente);  
          
          if (docente == null) {
            alert("Contraseña Incorrecta");
          } else {            
            this.dataApi.setTutor(docente);
            let token = this.docente.passDocente;
            this.dataApi.setToken(token);
            this.router.navigate(['../home']);                         
          }

        }
      );
  }



 





}
