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
          <div id="tableContainer" v-if="clients.length>0">
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
                  <td>{{factura.date}}</td>
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
                  <th>Nombres</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(factura, index) in bills">
                  <td>{{factura.client_id}}</td>
                  <td>{{factura.service}}</td>
                  <td>{{factura.amount}}</td>
                  <td>{{factura.date}}</td>
                </tr>
              </tbody>
            </table>
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
              <tr >
                <td> </td>
                <td> </td>
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
            <table class="ui celled padded table">
              <col width="25%">
              <col width="30%">
              <col width="25%">
              <col width="15%">
              <thead class="tableHeader">
                <tr>
                  <th>No. Identidad</th>
                  <th>Nombres</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
              </tbody>
            </table>
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
          amount: '',
          fine: '',
          date: ''
        }
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
          this.yearActive = moment().format("YYYY")
        }
        this.tabNumber = numero;
      },
      cambioMes(monthActive){
        this.monthActive = monthActive;
      },
      cambioFecha(){
        this.dayActive = this.reporteDia;
        ipcRenderer.on('return-bills-date', (event,arg)=>{
          this.bills = arg
        });
        ipcRenderer.send('get-bills-date',this.dayActive);
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
