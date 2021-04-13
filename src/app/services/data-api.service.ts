import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { isNullOrUndefined } from 'util';
import { DocenteInterfaces } from 'src/app/models/docente-interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  URL = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) { }



  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });


  //================================================================ Docente ================================================================
  guardarDocente(docente) {
    return this.http.post(this.URL + '/guardarDocente', docente, { responseType: 'text' });
  }


  loginUser(userDocente) {
    return this.http.get(`${this.URL}/datosDocenteUser/${userDocente}`);

  }

  loginPass(passDocente1) {
    return this.http.get(`${this.URL}/datosDocentePass/${passDocente1}`);

  }


  //Selecciona el tutor logeado
  setTutor(tutor): void {
    let tutor_string = JSON.stringify(tutor);
    console.log(tutor_string)
    localStorage.setItem("currentUser", tutor_string);

    this.updateUsuario(tutor)



  }


  setToken(token): void {
    localStorage.setItem("accessToken", token);

  }

  updateUsuario(objeto){
    this.usuarioObservable.next(objeto)
  }


  //Cargar tutor dese el localStrore
  getCurrentTutor() {
    let tutor_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(tutor_string)) {
      let docente: DocenteInterfaces = JSON.parse(tutor_string);
      //this.updateUsuario(docente);
      return docente;
    } else {
      return null;
    }
  }

  usuario // estatico
  usuarioObservable = new BehaviorSubject([]); // hacer publico datos de usuario.. tiempo real

  getUsuario(){
    return this.usuario;
  }

  getToken() {
    let token_string = localStorage.getItem("accessToken");
    if (!(token_string === undefined || token_string === null)) {
      let token: String = (token_string);
      return token;
    } else {
      return null;
    }
  }

  logOut() {
    localStorage.clear();
    //this.usuarioObservable.next(null)


  }


  //================================================================ Materia ================================================================

  //Carga un los materias de un solo ID del docente
  cargarMaterias(idDocente: String) {
    return this.http.get(`${this.URL}/cargarMaterias/${idDocente}`);
  }

  //Guardar materia
  guardarMateria(materia) {
    return this.http.post(this.URL + '/guardarMateria', materia, { responseType: 'text' });
  }

  //Borrar materia
  borrarMateria(id: String) {
    console.log(id);
    return this.http.delete(`${this.URL}/borrarMateria/${id}`, { responseType: 'text' });
  }

  //Cargar una materia
  detalleUnaMateria(id: String) {
    return this.http.get(`${this.URL}/detalleUnaMateria/${id}`);
  }



  //================================================================ Tema ================================================================

  //Carga un los temas de un solo libro
  cargarTemas(idMateria: String) {
    return this.http.get(`${this.URL}/cargarTemas/${idMateria}`);
  }

  //Almacenar Tema
  guardarTema(tema) {
    return this.http.post(this.URL + '/guardarTema', tema, { responseType: 'text' });
  }

  //Borrar materia
  borrarTema(id: String) {
    return this.http.delete(`${this.URL}/borrarTema/${id}`, { responseType: 'text' });
  }


  //Cargo detalles de un solo tema
  cargarUnTema(id: String) {
    return this.http.get(`${this.URL}/cargaUnTema/${id}`);
  }

  //Cargar una materia
  detalleUnTema(id: String) {
    return this.http.get(`${this.URL}/detalleUnTema/${id}`);
  }



  //================================================================ Experimento ================================================================

  //Carga lista de experimentos
  cargarExperimentos(id: String) {
    return this.http.get(`${this.URL}/cargarExperimentos/${id}`);
  }

  //Cargo detalles de un solo tema
  cargarUnExperimento(id: String) {
    return this.http.get(`${this.URL}/cargarUnExperimento/${id}`);
  }

  //Almacenar Experimento
  guardarExperimento(experimento) {
    return this.http.post(this.URL + '/guardarExperimento', experimento, { responseType: 'text' });
  }

  //Borrar experimento
  borrarExperimento(id: String) {
    return this.http.delete(`${this.URL}/borrarExperimento/${id}`, { responseType: 'text' });
  }




  //================================================================ Estudiantes ================================================================

  //Carga Id de Estudiantes
  cargaListaIdEstudiante(id: String) {
    return this.http.get(`${this.URL}/cargaListaIdEstudiante/${id}`);
  }

  //Carga data de estudiantes
  cargaDataEstudiantes(id: String) {
    return this.http.get(`${this.URL}/cargaEstudiante/${id}`);
  }



  //================================================================ Practicas ================================================================

  //Carga datos de las practicas
  cargaDatosPracticas(id: String) {
    return this.http.get(`${this.URL}/cargaDatosPracticas/${id}`);
  }


  //Carga una sola practica
  cargaUnaPractica(id: String) {
    return this.http.get(`${this.URL}/cargarUnaPractica/${id}`);
  }





}
