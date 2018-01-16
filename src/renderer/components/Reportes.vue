<template>
  <div class="principal">
    <div class="fondo"></div>
      <div class="ui center aligned container" id="contenedor">
        <div class="ui three item menu">
          <a class="item" v-bind:class="{active: tabNumber===1}" v-on:click="tabSelected(1)">Clientes en Mora</a>
          <a class="item" v-bind:class="{active: tabNumber===2}" v-on:click="tabSelected(2)">Ingreso diario</a>
          <a class="item" v-bind:class="{active: tabNumber===3}" v-on:click="tabSelected(3)">Ingreso Mensual</a>
        </div>
        <!-- *********** PRIMERA TAB *********** -->
        <div v-if="tabNumber==1">
          <div class="ui yellow inverted segment"><h1><i class="history icon"></i> En Mora pago de Cable</h1></div>
          <div id="tableContainer" v-if="bills.length>0">
            <table class="ui celled padded table">
              <col width="20%">
              <col width="30%">
              <col width="20%">
              <col width="10%">
              <col width="20%">
              <thead class="tableHeader">
                <tr>
                  <th>No. Identidad</th>
                  <th>Servicio</th>
                  <th>Monto</th>
                  <th>Mora</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(factura, index) in bills">
                  <td>{{factura.client_id}}</td>
                  <td>{{factura.service}}</td>
                  <td>{{factura.amount}}</td>
                  <td>{{factura.fine}}</td>
                  <td>[{{factura.dateDay}}-{{factura.dateMonth}}-{{factura.dateYear}}] {{factura.dateTime}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br>
          <div id="tableContainer" v-if="clients.length>0">
            <table class="ui celled padded table">
              <col width="30%">
              <col width="25%">
              <col width="25%">
              <col width="15%">
              <thead class="tableHeader">
                <tr>
                  <th>No. Identidad</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Correo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cli, index) in clients">
                  <td>{{cli.idnumber}}</td>
                  <td>{{cli.firstname}}</td>
                  <td>{{cli.lastname}}</td>
                  <td>{{cli.email}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-if="clients.length===0">No hay facturas registradas.</p>
          <div class="ui segments">
            <div class="ui segment">
              <p>1. Top</p>
            </div>
            <div class="ui segment">
              <p>2. Middle</p>
            </div>
            <div class="ui segment">
              <p>3. Middle</p>
            </div>
            <div class="ui segment">
              <p>4. Middle</p>
            </div>
            <div class="ui segment">
              <p>5. Bottom</p>
            </div>
          </div>
          <div class="ui blue inverted segment"><h1> <i class="history icon"></i>En Mora pago de Agua</h1></div>
          <div class="ui segments">
            <div class="ui segment">
              <p>1. Top</p>
            </div>
            <div class="ui segment">
              <p>2. Middle</p>
            </div>
            <div class="ui segment">
              <p>3. Middle</p>
            </div>
            <div class="ui segment">
              <p>4. Middle</p>
            </div>
            <div class="ui segment">
              <p>5. Bottom</p>
            </div>
          </div>
        </div>
        <!-- *********** SEGUNDA TAB *********** -->
        <div v-else-if="tabNumber==2">
          <div class="ui yellow inverted segment"><h1> <i class="remove from calendar icon"></i>Transacciones del dia {{dayActive}}</h1></div>
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
          <div id="tableContainer">
            <table class="ui celled padded table">
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
                  <td>{{factura.amount}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ui inverted red segment" v-if="bills.length===0">
            <h5>No hay facturas del dia seleccionado.</h5>
          </div>
        </div>
        <!-- *********** TERCERA TAB *********** -->
        <div v-else="tabNumber==3">
          <div class="ui black inverted segment"><h1> <i class="calendar icon"></i>Ingreso Mensual {{yearActive}}</h1></div>
          <table class="ui celled padded inverted table">
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
            </tbody>
          </table>
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
          <div class="ui segment"><h2> {{monthActive}}</h2></div>
          <div id="tableContainer">
            <div id="tableContainer">
              <table class="ui celled padded table">
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
                    <td>{{factura.amount}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="ui inverted red segment" v-if="bills.length==0">
              <h5>No hay facturas del mes seleccionado.</h5>
            </div>
          </div>
        </div>

      </div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');
const moment = require('moment');
  export default {
    name: 'reportes',
    data(){
      return {
        tabNumber:1,
        dayActive:'',
        yearActive: '',
        monthActive: 'ENERO',
        clients: [],
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
        ]
      }
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
          this.ingresoAnual();
          this.cambioMes('ENERO');
        }
        this.tabNumber = numero;
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
        ipcRenderer.on('return-bills-month', (event,arg)=>{
          this.bills = arg;
        });
        ipcRenderer.send('get-bills-month',month,this.yearActive);
      },
      ingresoAnual(){
        ipcRenderer.on('return-bills-year', (event,arg)=>{
          this.bills = arg;
        });
        ipcRenderer.send('get-bills-year',this.yearActive);
        for (var i = 0; i < this.bills.length; i++){
          this.bill = this.bills[i];
          if(this.bill.dateMonth == '01'){
            this.mensualidad[0].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '02') {
            this.mensualidad[1].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '03') {
            this.mensualidad[2].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '04') {
            this.mensualidad[3].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '05') {
            this.mensualidad[4].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '06') {
            this.mensualidad[5].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '07') {
            this.mensualidad[6].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '08') {
            this.mensualidad[7].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '09') {
            this.mensualidad[8].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '10') {
            this.mensualidad[9].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '11') {
            this.mensualidad[10].monto += parseInt(this.bill.amount);
          }else if (this.bill.dateMonth == '12') {
            this.mensualidad[11].monto += parseInt(this.bill.amount);
          }
        }
      },
      cambioFecha(){
        this.dayActive = this.reporteDia;
        ipcRenderer.on('return-bills-date', (event,arg)=>{
          this.bills = arg;
        });
        let fecha = this.dayActive.split('-',3);
        ipcRenderer.send('get-bills-date',fecha[2],fecha[1],fecha[0]);
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

</style>
