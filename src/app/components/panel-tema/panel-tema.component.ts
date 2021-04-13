import { ChangeDetectionStrategy, ViewEncapsulation, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { DataApiService } from 'src/app/services/data-api.service';

import { TemaInterfaces } from 'src/app/models/tema-interfaces';
import { ExperimentoInterfaces } from 'src/app/models/experimento-interfaces';

import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';


import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';


import { Location } from '@angular/common';

@Component({
  selector: 'app-panel-tema',
  templateUrl: './panel-tema.component.html',
  styleUrls: ['./panel-tema.component.css']
})
export class PanelTemaComponent implements OnInit {



  //------------------------------ Carga CSV ------------------------------
  csvRecords: any[] = [];
  header: boolean = false;
  @ViewChild('fileImportInput') fileImportInput: any;




  //------------------------------ Graficar ----------------------------------

  lineChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];

  lineChartLabels: Label[] = [''];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      /*borderColor: 'rgba(0,0,0,.54)',*/
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  //-----------------------------------------------------------------------------


  panelOpenState = false;

  message = '';
  registroFrom: FormGroup;
  hide = true;

  data: any;

  temas = null;
  public tema: TemaInterfaces = {
    id: "",
    nombreTema: "",
    introduccionTema: "",
    instruccionesTema: "",
    bibliografiaTema: "",
    idMateria: ""
  }

  experimentos = null;
  public experimento: ExperimentoInterfaces = {
    id: "",
    nombreExperimento: "",
    preguntaExperimento: "",
    dataExperimento: "",
    labelExperimento: "",
    idTema: ""
  }

  chart = [];

  constructor(
    private route: ActivatedRoute,
    private dataApi: DataApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxCsvParser: NgxCsvParser,
    private location: Location,
  ) { }


  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    console.log("Entro: " + id)
    this.cargarUnTema(id);
    this.cargarExperimentos(id);

    //Validar Formulario
    this.registroFrom = this.formBuilder.group({
      nombreExperimento: ['', [Validators.required, Validators.maxLength(400), Validators.minLength(5)]],
      preguntaExperimento: ['', [Validators.required, Validators.maxLength(1000), Validators.minLength(5)]],
    });


  }


  onRegisterSubmit(experimento) {
    this.guardarExperimento(experimento);
  }


  //Carga un Tema
  cargarUnTema(id) {
    this.dataApi.cargarUnTema(id)
      .subscribe(
        tema => {
          console.log(tema)
          this.tema = tema;
        }
      )
  }

  //Carga el temas con todos los subtemas
  cargarTemas(idMateria) {
    this.dataApi.cargarTemas(idMateria)
      .subscribe(
        tema => {
          console.log("Temas->", tema);
          this.temas = tema;
        });
  }


  //Leectura de CSV
  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        console.log('Result', result);
        this.csvRecords = result;

        //Longitud de el Array
        let longitud = (Object.keys(this.csvRecords).length);
        //console.log(longitud);
        //console.log("dato 1 => ", result[0]);

        let arregloFinal = [];

        for (let item of result) {
          //console.log("item -> ",item);
          arregloFinal.push(item[0]);
          arregloFinal.push(item[1]);
        }

        console.log('arreglo final -> ', arregloFinal);


        this.lineChartData = [
          { data: arregloFinal, label: 'Puntos de movimiento' },
        ];

        let arreglo = Array.from(Array(arregloFinal.length).keys()).map(String)
        console.log("labels ->", arreglo);

        this.lineChartLabels = arreglo;


      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }





  //Cargar Experimentos
  cargarExperimentos(idTema) {
    this.dataApi.cargarExperimentos(idTema)
      .subscribe(
        experimento => {
          console.log("experimentos -> ", experimento)
          this.experimentos = experimento;

        }
      )
  }


  open(experimento) {
    console.log(experimento)
    //Convierte String a Array valores de x con -y a +y  
    let arrayStringToArray = JSON.parse("[" + experimento.dataExperimento + "]")
    console.log('array String convertido en array', arrayStringToArray);

    //Coviente a String a Array valores de Label
    let labelarrayStringToArray = JSON.parse("[" + experimento.labelExperimento + "]")
    console.log('array String convertido en array', arrayStringToArray);


    //Envio a Graficar
    this.lineChartData = [
      { data: arrayStringToArray, label: 'Puntos de movimiento' },
    ];

    this.lineChartLabels = labelarrayStringToArray;

  }


  //Guarda un experimento 
  guardarExperimento(experimento) {
    const post =
    {
      'id': this.experimento.id,
      'nombreExperimento': this.registroFrom.value.nombreExperimento,
      'preguntaExperimento': this.registroFrom.value.preguntaExperimento,
      'dataExperimento': (this.lineChartData[0]['data']).toString(),
      'labelExperimento': (this.lineChartLabels).toString(),
      'idTema': this.tema.id

    };

    //Convierte de Array a Cadena
    let arrayString = (post['dataExperimento']).toString()
    //console.log('array convertido en cadena ', arrayString);

    //Convierte String a Array
    let arrayStringToArray = JSON.parse("[" + arrayString + "]")
    //console.log('array String convertido en array', arrayStringToArray);


    console.log(post);

    this.dataApi.guardarExperimento(post)
      .subscribe(
        response => {
          console.log(response);
          this.cargarExperimentos(this.tema.id);
          this.experimento.id = '';
          this.experimento.nombreExperimento = '';
          this.experimento.preguntaExperimento = '';

        });

  }



  borrarExperimento(id) {
    console.log(id)
    if (confirm("Seguro quiere eliminar el Experimento"))
      this.dataApi.borrarExperimento(id)
        .subscribe(
          data => {
            console.log(data);
            this.cargarExperimentos(this.tema.id);
          },
          error => console.log('ERROR: ' + error)
        );
  }


  //Actualizar Experimento
  actualizarExperimento(id) {
    this.panelOpenState = false;
    console.log(id)
    this.dataApi.cargarUnExperimento(id)
      .subscribe(
        experimento => {
          console.log(experimento)
          this.experimento = experimento
        }
      )
  }



  //Borrar Datos
  borrar() {
    console.log("Se elimino un experimento");
  }


  //Salida de Usuario
  logout() {
    this.dataApi.logOut()
    this.router.navigate(['/user/login'])
  }


  menu(){
    console.log("Volver")
    //this.router.navigate(['../tema'])

    this.location.back();

  }

}
