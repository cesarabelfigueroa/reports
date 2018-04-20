<template>
  <div class="principal">
    <div class="fondo"></div>
      <div class="ui center aligned container" id="contenedor">
        <div class="ui four item menu">
          <a class="item" v-bind:class="{active: tabNumber === 1}" v-on:click="tabSelected(1)">Clientes en Mora</a>
          <a class="item" v-bind:class="{active: tabNumber === 2}" v-on:click="tabSelected(2)">Ingreso diario</a>
          <a class="item" v-bind:class="{active: tabNumber === 3}" v-on:click="tabSelected(3)">Ingreso Mensual</a>
          <a class="item" v-bind:class="{active: tabNumber === 4}" v-on:click="tabSelected(4)">Ingreso Anual</a>
        </div>
        <button v-if="tabNumber != 1" v-on:click="generate(1)" class="fluid ui basic blue button"><i class="file alternate outline icon"></i> PDF de Todos los Pagos</button>
        <br>
        <!-- *********** PRIMERA TAB *********** -->
        <div v-if="tabNumber==1">
          <div class="ui blue inverted segment"><h1> <i class="history icon"></i>En Mora pago de Agua</h1></div>
          <div v-if="moraAgua.length != 0" id="reporteMoraAgua" class="ui container reporteMora">
            <table class="ui celled padded table">
              <col width="25%">
              <col width="30%">
              <col width="25%">
              <col width="15%">
              <thead class="tableHeader">
                <tr>
                  <th>No. Identidad</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Deuda</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cli in aguaPagina">
                  <td>{{cli.client.idnumber}}</td>
                  <td> {{cli.client.firstname}}</td>
                  <td>{{cli.client.lastname}}</td>
                  <td>{{cli.moras === 0 ? '1 pago pero no esta en mora' : cli.moras > 1 ? `${cli.moras} pagos` : 'pago'}} Lps.</td>
                </tr>
              </tbody>
            </table>
            <div>
              <span class="ui button" v-on:click="paginar(1, n.i)" v-for="n in pag2">{{n.i}}</span>
            </div>
            <br>
          </div>
          <div v-if="moraAgua.length == 0" class="ui segment">
            <p>No hay clientes en mora de pago de agua</p>
          </div>
          <div class="ui yellow inverted segment"><h1><i class="history icon"></i> En Mora pago de Cable</h1></div>
          <div v-if="moraCable.length != 0" id="reporteMoraCable" class="container reporteMora">
            <table class="ui celled padded table">
              <col width="25%">
              <col width="30%">
              <col width="25%">
              <col width="15%">
              <thead class="tableHeader">
                <tr>
                  <th>No. Identidad</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Deuda</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cli in cablePagina" >
                  <td>{{cli.client.idnumber}}</td>
                  <td> {{cli.client.firstname}}</td>
                  <td>{{cli.client.lastname}}</td>
                  <td>{{cli.moras === 0 ? '1 pago pero no esta en mora' : cli.moras > 1 ? `${cli.moras} pagos` : 'pago'}} Lps.</td>
                </tr>
              </tbody>
            </table>
            <div>
              <span class="ui button" v-on:click="paginar(2, n.i)" v-for="n in pag">{{n.i}}</span>
            </div>
            <br>
          </div>
          <div v-if="moraCable.length == 0" class="ui segment">
            <p>No hay clientes en mora de pago de cable</p>
          </div>
        </div>
        <!-- *********** SEGUNDA TAB *********** -->
        <div v-else-if="tabNumber==2">
          <div class="ui yellow inverted segment"><h1> <i class="remove from calendar icon"></i>Transacciones del día {{dayActive}}</h1></div>
          <div class="ui black segment">
            <div class="ui left aligned container">
              <h3 > <i class="checked calendar icon"></i>Escoger fecha:  </h3>
              <h4>
                <input type="date" min="2000-01-01" class="ui fluid input" v-model="reporteDia">
                <br>
                <button v-on:click="cambioFecha()" class="ui blue basic button">Ingresar</button>
              </h4>
            </div>
          </div>
          <br>
          <div v-if="bills.length!=0" class="reportaMora">
            <button class="ui black basic button" v-on:click="generate(2)">Generar PDF de Ingresos {{dayActive}}</button>
            <table id="tableContainerDay" class="ui celled padded table">
              <col width="25%">
              <col width="30%">
              <col width="25%">
              <col width="15%">
              <thead class="tableHeader">
                <tr>
                  <th>No. Identidad</th>
                  <th>Servicio</th>
                  <th>Fecha [DD-MM-YYYY]</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(factura, index) in bills">
                  <td>{{factura.client_id}}</td>
                  <td>{{factura.service}}</td>
                  <td>[{{factura.dateDay}}-{{factura.dateMonth}}-{{factura.dateYear}}] {{factura.dateTime}}</td>
                  <td>{{factura.amount + factura.fine}} Lps.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ui inverted red segment" v-if="bills.length===0">
            <h5>No hay facturas del día seleccionado.</h5>
          </div>
        </div>
        <!-- *********** TERCERA TAB *********** -->
        <div v-else-if="tabNumber==3">
          <div class="ui black inverted segment"><h1> <i class="calendar icon"></i>Ingreso Mensual {{yearActive}}</h1></div>
          <div class="ui four column grid">
            <div class="row">
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='ENERO'}" v-on:click="cambioMes('ENERO')" class="fluid ui olive button">ENERO</button>
              </div>
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='FEBRERO'}" v-on:click="cambioMes('FEBRERO')" class="fluid ui green button">FEBRERO </button>
              </div>
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='MARZO'}" v-on:click="cambioMes('MARZO')" class="fluid ui teal button"> MARZO</button>
              </div>
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='ABRIL'}" v-on:click="cambioMes('ABRIL')" class="fluid ui yellow button">ABRIL </button>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='MAYO'}" v-on:click="cambioMes('MAYO')" class="fluid ui yellow button"> MAYO</button>
              </div>
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='JUNIO'}" v-on:click="cambioMes('JUNIO')" class="fluid ui olive button">JUNIO </button>
              </div>
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='JULIO'}" v-on:click="cambioMes('JULIO')" class="fluid ui green button">JULIO </button>
              </div>
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='AGOSTO'}" v-on:click="cambioMes('AGOSTO')" class="fluid ui teal button">AGOSTO </button>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='SEPTIEMBRE'}" v-on:click="cambioMes('SEPTIEMBRE')" class="fluid ui green button"> SEPTIEMBRE</button>
              </div>
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='OCTUBRE'}" v-on:click="cambioMes('OCTUBRE')" class="fluid ui teal  button">OCTUBRE </button>
              </div>
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='NOVIEMBRE'}" v-on:click="cambioMes('NOVIEMBRE')" class="fluid ui olive button">NOVIEMBRE </button>
              </div>
              <div class="column">
                <button id="botonMes" v-bind:class="{active:monthActive==='DICIEMBRE'}" v-on:click="cambioMes('DICIEMBRE')" class="fluid ui yellow button"> DICIEMBRE</button>
              </div>
            </div>
          </div>
          <br>
           <button v-if="bills.length>0" class="ui black button" v-on:click="generate(3)">Generar PDF de de Ingresos de {{monthActive}}</button>
          <div class="ui segment"><h2> {{monthActive}}</h2></div>
          <div v-if="bills.length!=0" id="tableContainerMonth">
            <div class="reporteMora">
              <table class="ui celled padded table" id="monthDetail">
                <col width="25%">
                <col width="30%">
                <col width="25%">
                <col width="15%">
                <thead class="tableHeader">
                  <tr>
                    <th>No. Identidad</th>
                    <th>Servicio</th>
                    <th>Fecha [DD-MM-YYYY]</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(factura, index) in bills">
                    <td>{{factura.client_id}}</td>
                    <td>{{factura.service}}</td>
                    <td>[{{factura.dateDay}}-{{factura.dateMonth}}-{{factura.dateYear}}] {{factura.dateTime}}</td>
                    <td>{{factura.amount + factura.fine}} Lps.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="ui inverted red segment" v-if="bills.length==0">
            <h5>No hay facturas del mes seleccionado.</h5>
          </div>
        </div>
        <!-- *********** CUARTA TAB *********** -->
        <div v-else>
          <div class="ui black inverted segment">
            <h1>
              <div class="ui grid">
                <div class="three column row">
                  <div class="column">
                    <button v-bind:class="{disabled:lastYear}" class="ui circular olive icon button" v-on:click="arrows('left')">
                      <i class="arrow left icon"></i>
                    </button>
                  </div>
                  <div class="column">
                    <i class="calendar icon"></i>Ingreso Anual {{yearActive}}
                  </div>
                  <div class="column">
                    <button v-bind:class="{disabled:nextYear}" class="ui circular olive icon button" v-on:click="arrows('right')">
                      <i class="arrow right icon"></i>
                    </button>
                  </div>
                </div>
              </div>
              </h1>
          </div>
          <button v-if="bills.length>0" class="ui olive button" v-on:click="generate(4)">Generar PDF de Ingresos {{yearActive}}</button>
          <br><br><br>
          <div class="ui centered grid">
            <table id="tablaAnual" class="ui celled padded inverted table">
              <col width="50%">
              <col width="50%">
              <thead class="tableHeader">
                <tr>
                  <th>Mes</th>
                  <th>Ingresos</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(montoMes, index) in mensualidad" >
                  <td> {{montoMes.mes}}</td>
                  <td> {{montoMes.monto}} Lps.</td>
                </tr>
                <tr>
                  <td> Total </td>
                  <td> {{totalAnual}} Lps.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal v-if="showModal" :title="title" :message="message" :mode="modeIndex" @close="showModal = false" @finish="handleClose()">
      </Modal>
  </div>
</template>

<script>
import Modal from './Modal';
const { ipcRenderer } = require('electron');
const moment = require('moment');
let jsPDF = require('jspdf');
require('jspdf-autotable');
const $ = require('jquery');


  export default {
    name: 'reportes',
    data(){
      return {
        tabNumber:1,
        dayActive:'',
        yearActive: '',
        monthActive: 'ENERO',
        clients: [],
        moraAgua: [],
        moraCable: [],
        aguaPagina: [],
        cablePagina: [],
        pagina: 1,
        pagina2: 1,
        pag: [],
        pag2: [],
        client:{
          idnumber: '',
          firstname: '',
          lastname: '',
          email: ''
        },
        reporteDia: '',
        bills:[],
        bill:{
          client_id: '',
          service: '',
          amount: 0,
          fine: 0,
          dateDay: '',
          dateMonth: '',
          dateTime: '',
          dateYear: ''
        },
        mensualidad: [
          {mes: 'Enero', monto:0},
          {mes: 'Febrero', monto:0},
          {mes: 'Marzo', monto:0},
          {mes: 'Abril', monto:0},
          {mes: 'Mayo', monto:0},
          {mes: 'Junio', monto:0},
          {mes: 'Julio', monto:0},
          {mes: 'Agosto', monto:0},
          {mes: 'Septiembre', monto:0},
          {mes: 'Octubre', monto:0},
          {mes: 'Noviembre', monto:0},
          {mes: 'Diciembre', monto:0}
        ],
        lastYear: false,
        nextYear: false,
        totalAnual: 0,
        showModal: false,
        message:'',
        title:'',
        modeIndex:1
      }
    },
    components: {
      Modal: Modal
    },
    methods: {
      open(link){
        this.$electron.shell.openExternal(link)
      },
      tabSelected(numero){
        if(numero===2){
          this.dayActive = moment().format("YYYY-MM-DD");
          this.reporteDia = moment().format("YYYY-MM-DD");
          this.cambioFecha();
        }else if (numero === 3) {
          this.yearActive = moment().format("YYYY");
          this.cambioMes('ENERO');
        }else if (numero === 4) {
          this.yearActive = moment().format("YYYY");
          // this.arrows();
          this.ingresoAnual();
        }
        this.tabNumber = numero;

      },
      generate(pdfContent) {
        if(pdfContent === 1){
              let facturas = ipcRenderer.sendSync('get-billsSync');
              let doc = new jsPDF('p', 'pt');
              let titulos= [
                {title:"Id del cliente", dataKey:"client_id"},
                {title:"Servicio", dataKey: "service"},
                {title:"Cantidad", dataKey: "amount"},
                {title:"Multa", dataKey: "fine"},
                {title:"Dia", dataKey: "dateDay"},
                {title:"Mes", dataKey: "dateMonth"},
                {title:"Año", dataKey: "dateYear"},
                {title:"Hora", dataKey: "dateTime"}
              ];
              doc.autoTable(titulos, facturas, {
                  theme: 'striped', 
                  margin: {top: 60},
                  addPageContent: function(data) {
                    doc.text("Reporte Completo de transacciones Unicredit ", 40, 30);
                  }
              });
              doc.save("reporte_Completo_Unicredit.pdf");
            }else if(pdfContent === 2){
              let doc = new jsPDF('p', 'pt');
              let res = doc.autoTableHtmlToJson(document.getElementById('tableContainerDay'));
              let day = this.dayActive;
              doc.autoTable(res.columns, res.data, {
                  theme: 'striped', 
                  margin: {top: 60},
                  addPageContent: function(data) {
                    doc.text("Reporte Unicredit ["+day+"]", 40, 30);
                  }
              });
              doc.save("reporte["+day+"]Unicredit.pdf");
            }else if(pdfContent === 3){
              let doc = new jsPDF('p', 'pt');
              let res = doc.autoTableHtmlToJson(document.getElementById('monthDetail'));
              let month = this.monthActive;
              let year = this.yearActive;
              doc.autoTable(res.columns, res.data, {
                  theme: 'striped', 
                  margin: {top: 60},
                  addPageContent: function(data) {
                    doc.text("Reporte Unicredit ["+month+" "+year+"]", 40, 30);
                  }
              });
              doc.save("reporte["+month+" "+year+"]Unicredit.pdf");
            }else{
              let doc = new jsPDF('p', 'pt');
              let year = this.yearActive;
              let facturas = ipcRenderer.sendSync('get-billsSync');
              let titulos= [
                {title:"Id del cliente", dataKey:"client_id"},
                {title:"Servicio", dataKey: "service"},
                {title:"Cantidad", dataKey: "amount"},
                {title:"Multa", dataKey: "fine"},
                {title:"Dia", dataKey: "dateDay"},
                {title:"Mes", dataKey: "dateMonth"},
                {title:"Año", dataKey: "dateYear"},
                {title:"Hora", dataKey: "dateTime"}
              ];
              doc.autoTable(titulos, this.bills, {
                  theme: 'striped', 
                  margin: {top: 60},
                  addPageContent: function(data) {
                    doc.text("Reporte Unicredit ["+year+"]", 40, 30);
                  }
              });
              doc.save("reporte_"+year+"Unicredit.pdf");
            }
        try {
            
        }
        catch(err) {
            this.emptyTableAlert();
            //document.getElementById("demo").innerHTML = err.message;
            console.log(err.message);
        }
      },
      cambioMes(monthActive){
        this.monthActive = monthActive;
        let month = '01';
        if(this.monthActive == 'ENERO'){
          month = '01';
        }else if (this.monthActive == 'FEBRERO') {
          month = '02';
        }else if (this.monthActive == 'MARZO') {
          month = '03';
        }else if (this.monthActive == 'ABRIL') {
          month = '04';
        }else if (this.monthActive == 'MAYO') {
          month = '05';
        }else if (this.monthActive == 'JUNIO') {
          month = '06';
        }else if (this.monthActive == 'JULIO') {
          month = '07';
        }else if (this.monthActive == 'AGOSTO') {
          month = '08';
        }else if (this.monthActive == 'SEPTIEMBRE') {
          month = '09';
        }else if (this.monthActive == 'OCTUBRE') {
          month = '10';
        }else if (this.monthActive == 'NOVIEMBRE') {
          month = '11';
        }else if (this.monthActive == 'DICIEMBRE') {
          month = '12';
        }
        ipcRenderer.send('get-bills-month',month,this.yearActive);
      },
      ingresoAnual(){
        this.totalAnual =0;
        for (let i = 0; i < this.mensualidad.length; i++) {
          this.mensualidad[i].monto = 0;
        }
        this.bills = ipcRenderer.sendSync('get-bills-yearSync',this.yearActive);
        this.bills.forEach((bill) => {
          this.mensualidad[parseInt(bill.dateMonth)-1].monto += (bill.amount+bill.fine);
          this.totalAnual += (bill.amount+bill.fine);
        });
      },
      arrows(dir){
        let Year = dir === 'left' ? (parseInt(this.yearActive)-1)+'': (parseInt(this.yearActive)+1)+'';
        this.yearActive = Year;
        this.ingresoAnual();
      },
      modalType(index){
        this.modeIndex = index;
        this.showModal = true;
      },
      emptyTableAlert(){
        this.showModal = false;
        this.message = 'Oops! ha ocurrido un error';
        this.title = 'Error';
        this.modalType(5);
      },
      cambioFecha(){
        this.dayActive = this.reporteDia;
        let fecha = this.dayActive.split('-',3);
        ipcRenderer.send('get-bills-date',fecha[2],fecha[1],fecha[0]);
      },
      clientesMora() {
        let month = moment().format("MM");
        let year = moment().format("YYYY");
        let day = moment().format("DD");
        let monthInt = parseInt(month);
        let yearInt = parseInt(year);
        let dayInt = parseInt(day);
        // this.bills = ipcRenderer.sendSync('get-bills-monthSync', month, year);
        this.clients = ipcRenderer.sendSync('get-clientsSync');
        this.clients.forEach((client) => {

          let agua = false;
          let cable = false;
          let isMora = false;
            let billsAgua, latestAgua, billsCable, latestCable;
            if(client.services.includes('Agua')){
              billsAgua = ipcRenderer.sendSync('get-bills-water-clientSync', client.idnumber);
              latestAgua = this.lastBill(billsAgua);
            }
            if(client.services.includes('Cable')){
              billsCable = ipcRenderer.sendSync('get-bills-cable-clientSync', client.idnumber);
              latestCable = this.lastBill(billsCable);
            }
            if(latestAgua) {
              let currBillYear = parseInt(latestAgua.dateYear);
              let currBillMonth = parseInt(latestAgua.dateMonth);
              if(currBillMonth === monthInt && currBillYear === yearInt){
                isMora = false;
              }else if(currBillMonth + 1 === monthInt && currBillYear === yearInt){
                if(dayInt <= 7){
                  this.moraAgua.push({client, moras: 0});
                }else{
                  this.moraAgua.push({client, moras: 1});
                }
              }else{
                let sameTime = false;
                let moras = 0;
                while(!sameTime) {
                  if(currBillMonth === 12){
                    currBillMonth = 1;
                    currBillYear++;
                  }else{
                    currBillMonth++;
                  }
                  moras++;
                  if(currBillMonth === monthInt && currBillYear === yearInt) {
                    sameTime = true;
                  }
                }
                this.moraAgua.push({client, moras});
                // console.log(`Cliente debe ${moras} pagos de agua`);
              }
            }else if(client.services.includes('Agua')){
              let joinMonth = parseInt(client.joinMonth);
              let joinYear = parseInt(client.joinYear);
              if(joinMonth === monthInt && joinYear === yearInt) {
                if(dayInt > 7) {
                  this.moraAgua.push({client, moras: 1});
                }else{
                  this.moraAgua.push({client, moras: 0});
                }
              }else{
                let sameTime = false;
                let moras = 0;
                while(!sameTime){
                  if(joinMonth === 12){
                    joinMonth = 1;
                    joinYear++;
                  }else{
                    joinMonth++;
                  }
                  moras++;
                  if(joinMonth === monthInt && joinYear === yearInt){
                    sameTime = true;
                  }
                }
                this.moraAgua.push({client, moras});
              }
            }

            if(latestCable) {
              let currBillYear = parseInt(latestCable.dateYear);
              let currBillMonth = parseInt(latestCable.dateMonth);
              if(currBillMonth === monthInt && currBillYear === yearInt){
                isMora = false;
              }else if(currBillMonth + 1 === monthInt && currBillYear === yearInt){
                if(dayInt <= 7) {
                  this.moraCable.push({client, moras: 0});
                }else{
                  this.moraCable.push({client, moras: 1});
                }
              }else{

                let sameTime = false;
                let moras = 0;
                while(!sameTime) {
                  if(currBillMonth === 12){
                    currBillMonth = 1;
                    currBillYear++;
                  }else{
                    currBillMonth++;
                  }
                  moras++;
                  if(currBillMonth === monthInt && currBillYear === yearInt) {
                    sameTime = true;
                  }
                }
                this.moraCable.push({client, moras});
                // console.log(`Cliente debe ${moras} pagos de agua`);
              }
            }else if(client.services.includes('Cable')) {
              // console.log('No se encontro factura pero esta en mora de cable');
              let joinMonth = parseInt(client.joinMonth);
              let joinYear = parseInt(client.joinYear);
              if(joinMonth === monthInt && joinYear === yearInt) {
                if(dayInt > 7) {
                  this.moraCable.push({client, moras: 1});
                }else{
                  this.moraCable.push({client, moras: 0});
                }
              }else{
                let sameTime = false;
                let moras = 0;
                while(!sameTime){
                  if(joinMonth === 12){
                    joinMonth = 1;
                    joinYear++;
                  }else{
                    joinMonth++;
                  }
                  moras++;
                  if(joinMonth === monthInt && joinYear === yearInt){
                    sameTime = true;
                  }
                }
                this.moraCable.push({client, moras});
              }
            }
          });

      },
      paginar(service, pagina) {
        if(service===1){
          this.pagina = pagina;
          this.aguaPagina = [];

        }else{
          this.pagina2 = pagina;
          this.cablePagina = [];
        }
        let totalRows = service === 1 ? this.moraAgua.length : this.moraCable.length;
        let totalPages = Math.ceil(totalRows / 15);
        let begin = service === 1 ? (this.pagina-1)*15 : (this.pagina2-1) * 15;
        let end;
        if(service === 1 ){
          end = (this.pagina*15) >= totalRows ? totalRows : (this.pagina*15);
          for (let i = begin; i < end; i++) {
            this.aguaPagina.push(this.moraAgua[i]);
          }
        }else{
          end = (this.pagina2*15) >= totalRows ? totalRows : (this.pagina2*15);
          for (let i = begin; i < end; i++) {
            this.cablePagina.push(this.moraCable[i]);
          }
        }
      },
      lastBill(bills) {
        if(bills){
          let mostRecent = bills[0];

          bills.forEach((bill) => {
            if(parseInt(bill.dateYear) > parseInt(mostRecent.dateYear)){
              mostRecent = bill;
            }else if(parseInt(bill.dateYear) === parseInt(mostRecent.dateYear)) {
              if(parseInt(bill.dateMonth) > parseInt(mostRecent.dateMonth)){
                mostRecent = bill;
              }
            }
          });
          return mostRecent;
        }
      },
      page(service, reports) {
        $(document).ready(() => {
          let totalRows = reports;
          let recordPerPage = 5;
          let totalPages = Math.ceil(totalRows / recordPerPage);
          let $pages = $('<div></div>');
          for (let i = 0; i < totalPages; i++) {
            $(`<span class="pageNumber span${service}  ui button">&nbsp;` + (i + 1) + '</span>').appendTo($pages);
          }
          $pages.appendTo(`#reporteMora${service}`);
          $('.pageNumber').hover(
            function () {
              $(this).css({
                "background-color": "#333333",
                "color": "#fff",
                "cursor": "pointer",
                "font-weight": "bold"
              });

            },
            function () {
              if(!$(this).hasClass("chosen")){
                $(this).css({
                  "background-color": "#ffffff",
                  "color": "#000",
                  "cursor": "default",
                  "font-weight": "normal"
                });
              }

            }
          );

          $(`#reporteMora${service}`).find('div:has(p)').hide();
          let tr = $(`#reporteMora${service} div:has(p)`);
          for (let i = 0; i <= recordPerPage - 1; i++) {
            $(tr[i]).show();
          }
          $(`.span${service}`).click(function(event) {
            if($(this).hasClass("chosen")){
              $(this).removeClass("chosen");
            }else{
              let ch = $('.chosen');
              if(ch.length > 0 ){
                for (let i = 0; i < ch.length; i++) {
                  $(ch[i]).removeClass("chosen");
                  $(ch[i]).css({
                    "background-color": "#ffffff",
                    "color": "#000",
                    "cursor": "default",
                    "font-weight": "normal"
                  });
                }
              }
              $(this).addClass("chosen");
            }
            $(`#reporteMora${service}`).find('div:has(p)').hide();
            let nBegin = ($(this).text() - 1) * recordPerPage;
            let nEnd = $(this).text() * recordPerPage - 1;
            for (let i = nBegin; i <= nEnd; i++) {
              $(tr[i]).show();
            }
          });

        });
      }
    },

    beforeMount(){

      ipcRenderer.on('return-clients', (event,arg)=>{
        this.clients = arg;
      });
      ipcRenderer.send('get-clients');

      ipcRenderer.on('return-bills', (event,arg)=>{
        this.bills = arg;
      });

      ipcRenderer.send('get-bills');

      ipcRenderer.on('return-bills-month', (event,arg)=>{
        this.bills = arg;
      });

      ipcRenderer.on('return-bills-year', (event,arg)=>{
        this.bills = arg;
      });

      ipcRenderer.on('return-bills-date', (event,arg)=>{
        this.bills = arg;
      });
      
      this.clientesMora();

      this.paginar(1, 1);
      this.paginar(2, 1);

      for (let i = 0; i < Math.ceil(this.moraCable.length/15); i++) {
        this.pag.push({i: i+1});
      }
      for (let i = 0; i < Math.ceil(this.moraAgua.length/15); i++) {
        this.pag2.push({i: i+1});
      }
    },
    mounted() {
      // this.paginar('Cable', this.moraCable.length);
      //
      // this.paginar('Agua', this.moraAgua.length);
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  .fondo{
    background: linear-gradient(lightgray, white); /* Standard syntax */
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    padding-top: 100px;
  }

  .principal{
    padding-top: 9%;
    padding-bottom: 4%;
  }

  #tablaAnual{
    width: 400px;
  }

  .reporteMora {
    height: 30vh;	 
    max-height: 500px !important;
    overflow-y: auto;
  }

  #reporteMoraCable, #reporteMoraAgua {
    height: 100%;
  }

</style>
