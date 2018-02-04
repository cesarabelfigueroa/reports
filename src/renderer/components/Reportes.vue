<template>
  <div class="principal">
    <div class="fondo"></div>
      <div class="ui center aligned container" id="contenedor">
        <div class="ui four item menu">
          <a class="item" v-bind:class="{active: tabNumber===1}" v-on:click="tabSelected(1)">Clientes en Mora</a>
          <a class="item" v-bind:class="{active: tabNumber===2}" v-on:click="tabSelected(2)">Ingreso diario</a>
          <a class="item" v-bind:class="{active: tabNumber===3}" v-on:click="tabSelected(3)">Ingreso Mensual</a>
          <a class="item" v-bind:class="{active: tabNumber===4}" v-on:click="tabSelected(4)">Ingreso Anual</a>
        </div>
        <!-- *********** PRIMERA TAB *********** -->
        <div v-if="tabNumber==1">

          <div class="ui blue inverted segment"><h1> <i class="history icon"></i>En Mora pago de Agua</h1></div>
          <div class="ui segments">
            <div v-for="cli in moraAgua" class="ui segment">
              <p>{{cli.client.idnumber}}  {{cli.client.firstname}} {{cli.client.lastname}} debe {{cli.moras === 0 ? '1 pago pero no esta en mora' : cli.moras > 1 ? `${cli.moras} pagos` : 'pago'}} </p>
            </div>
            <div v-if="moraAgua.length == 0" class="ui segment">
              <p>No hay clientes en mora de pago de agua</p>
            </div>
          </div>
          <div class="ui yellow inverted segment"><h1><i class="history icon"></i> En Mora pago de Cable</h1></div>
          <div class="ui segments">
            <div v-for="cli in moraCable" class="ui segment">
              <p>{{cli.client.idnumber}}  {{cli.client.firstname}} {{cli.client.lastname}} debe {{cli.moras === 0 ? '1 pago pero no esta en mora' : cli.moras > 1 ? `${cli.moras} pagos` : 'pago'}}</p>
            </div>
            <div v-if="moraCable.length == 0" class="ui segment">
              <p>No hay clientes en mora de pago de cable</p>
            </div>
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
                    <td>{{factura.amount + factura.fine}} Lps.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="ui inverted red segment" v-if="bills.length==0">
              <h5>No hay facturas del mes seleccionado.</h5>
            </div>
          </div>
        </div>
        <!-- *********** CUARTA TAB *********** -->
        <div v-else="tabNumber==4">
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
        moraAgua: [],
        moraCable: [],
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
        nextYear: false
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
          this.cambioMes('ENERO');
        }else if (numero === 4) {
          this.yearActive = moment().format("YYYY");
          // this.arrows();
          this.ingresoAnual();
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
        ipcRenderer.send('get-bills-month',month,this.yearActive);
      },
      ingresoAnual(){
        for (var i = 0; i < this.mensualidad.length; i++) {
          this.mensualidad[i].monto = 0;
        }
        this.bills = ipcRenderer.sendSync('get-bills-yearSync',this.yearActive);
        this.bills.forEach((bill) => {
          this.mensualidad[parseInt(bill.dateMonth)-1].monto += (this.bills[i].amount+this.bills[i].fine);
        });
      },
      arrows(dir){
        let Year = dir === 'left' ? (parseInt(this.yearActive)-1)+'': (parseInt(this.yearActive)+1)+'';
        this.yearActive = Year;
        this.ingresoAnual();
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
