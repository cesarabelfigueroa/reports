<template>
  <div class="main">
    <div class="fondo"></div>
    <br>
    <div id="contenido">
      <div class="titulo">
        <div v-if="test==2" id="header-cable">
          <br>
          <h1><i class="big tv icon"></i>Pago Cable</h1>
          <h3>*Por mora se cobran L.10 extra. (Se aplica despues del 7mo dia de cada mes)</h3>
          <br>
        </div>
        <div v-if="test==1" id="header-agua">
          <br>
          <h1><i class="big shower icon"></i>Pago Agua</h1>
          <h3>*No hay cobro extra por mora para este servicio</h3>
          <br>
        </div>
      </div>
      <div class="franja"></div>
      <div id="formulario">
        <div class="ui container">
          <br>
          <div class="ui form">
            <div class="field">
              <label>Seleccionar Cliente: <i class="asterisk blue icon"></i></label>
              <select class="ui fluid selection dropdown" id="clientdropdown">
                <option value="" selected disabled>Nombre del cliente</option>
                <option v-if="test == 1" v-for="(val, index) in moraAgua" v-bind:key="index" :value="JSON.stringify(val)" >{{val.idnumber}}  {{val.client.firstname}} {{val.client.lastname}}</option>
                <option v-if="test == 2" v-for="(val, index) in moraCable" v-bind:key="index" :value="JSON.stringify(val)">{{val.idnumber}}  {{val.client.firstname}} {{val.client.lastname}}</option>
              </select>
            </div>
            <br>
            <div class="ui horizontal segments">
              <div class="ui segment">
                <h3>Monto Total:</h3>
              </div>
              <div class="ui segment">
                <h3>{{total}} Lps</h3>
              </div>
            </div>
            <div v-if="warning!=''" class="ui small orange inverted segment">
              <h5><i class="circle info icon"></i> {{warning}}</h5>
            </div>
            <br>
            <!-- <div class="two fields">
              <div class="field">
                <label>Monto a Pagar (Lps): <i class="asterisk blue icon"></i></label>
                <input type="number" v-model="amount" placeholder="Ej: 1000.00">
              </div>
            </div>
            <br> -->
            <p v-if="breakdown!=''" class="breakdown">{{breakdown}}</p>
            <p v-if="test==2" class="breakdown">{{mensajeMora}}</p>
            <button class="big ui button blue" v-on:click="verify">
              <i class="handshake file word outline icon"></i>
              Generar Factura
            </button>
            <div class="right aligned ui basic segment">
              <div v-if="boolEnero==true" class="ui big yellow animated fade button" id="show-modal" v-on:click="modalType(2)">
                <div class="hidden content">Pago Anual</div>
                <div class="visible content">
                  <i class="certificate icon"></i>Promoción
                </div>
              </div>
              <a class="ui blue image label" v-if="this.warnMessage!=''">
                *
                <div class="detail">{{this.warnMessage}}</div>
              </a>
            </div>
          </div>

          <br><br>
          <br>
        </div>
      </div>
    </div>
    <!-- ************************MODAL PROMOCION************************ -->
    <Modal v-if="showModal" :client="client" :clients="clients" :service="service" :title="title" :message="message" :mode="modeIndex" :test="test" @close="showModal = false" @finish="closePromocion()">

    </Modal>
    <br><br>
  </div>

</template>

<script>
  const { ipcRenderer } = require('electron');
  const moment = require('moment');
  import Modal from './Modal';

  export default {

    name: 'formulario',
    data() {
      return {
        mode : false,
        amount : 0,
        clients: [],
        moraAgua: [],
        moraCable: [],
        moras: 0,
        debts: 0,
        fine: 0,
        totalFine: 0,
        day: '',
        warning: '',
        showModal: false,
        boolEnero: false,
        warnMessage: '',
        indexCliente: 0,
        client: {
          idnumber: '',
          firstname: '',
          lastname: '',
          email: '',
          services:[],
          zone: 1
        },
        service:{
          name: '',
          description: '',
          zone: 1,
          cost: ''
        },
        zone: {
          numRate: 1,
          description: '',
          cost: 0
        },
        message: '',
        modeIndex: 2,
        title: '',
        breakdown: '',
        mensajeMora: ''
      }
    },
    components: {
      Modal: Modal
    },
    computed : {
      total: function () {
        this.mensajeMora = this.breakdown !='' ? `${this.debts} moras: ${this.debts*10} Lps`: '';
        this.totalFine = this.debts > 0 ? 10*this.debts : 0;
        return this.totalFine + (parseInt(this.amount)*this.moras);
      }
    },
    props: ['test'],
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      closePromocion(){
        let dd = document.getElementById('clientdropdown');
        dd.selectedIndex = 0;
        this.client = {
          idnumber: '',
          firstname: '',
          lastname: '',
          email: '',
          services:[],
          zone: 1
        }
        this.service = {
          name: '',
          description: '',
          zone: 1,
          cost: ''
        }
        this.zone = {
          numRate: 1,
          description: '',
          cost: 0
        }
        this.debts = 0;
        this.totalFine = 0;
        this.amount = 0;
        this.mensajeMora = '';
        this.breakdown = '';
        this.boolEnero = false;
        this.showModal = false;
        this.message = 'Factura ingresada con éxito';
        this.title = 'Alerta';
        this.modalType(5);
      },
      modalType(index){
        this.modeIndex = index;
        this.showModal = true;
      },
      verify() {
        const dd = document.getElementById('clientdropdown');
        let client_id = '';
        if (dd.selectedIndex>0) {
          client_id = (JSON.parse(dd.options[dd.selectedIndex].value).client).idnumber;
        }
        if(client_id !== '' && this.amount > 0){
          let service = this.test==1? 'agua' : 'cable';
          let dateYear = moment().format("YYYY");
          let dateMonth = moment().format("MM");
          let dateDay = moment().format("DD");
          let dateTime = moment().format("h:mm a");

          // **************** Factura ****************
          // console.log('Date: ', dateDay+' '+dateMonth+' '+dateYear );
          // console.log('Fine: ', this.fine);
          // console.log('Amount: ', this.amount);
          // console.log('Total: ', this.total);
          let bill = {
            client_id,
            service,
            amount: this.total - this.totalFine,
            fine: this.totalFine,
            dateYear,
            dateMonth,
            dateDay,
            dateTime
          }
          ipcRenderer.send('create-bill', bill);
          // this.fine = 0;
          this.amount = 0;
          dd.selectedIndex = 0;
          this.message = 'Factura ingresada con éxito';
          this.title = 'Alerta';
          this.modalType(5);
          this.breakdown = '';
          this.clientesMora();
        }else{
          this.message = 'Seleccione un cliente e ingrese un monto a pagar para poder realizar la facturacion';
          this.title = 'Error';
          this.modalType(5);
        }
      },
      selectClient() {

        const dd = document.getElementById('clientdropdown');
        if(dd.selectedIndex >= 0){
          let value = JSON.parse(dd.value).client;
          for (let i = 0; i < this.clients.length; i++) {
            if(this.clients[i]._id === value._id){
              this.indexCliente = i;
              break;
            }
          }
          this.client = value;
          if(parseInt(moment().format("DD")) > 7 && this.test==2){
            this.fine = 10;
          }
          this.zone = ipcRenderer.sendSync('get-zoneSync', parseInt(this.client.zone));
          this.service = ipcRenderer.sendSync('get-services-cost', (this.test==1 ? 'Agua' : 'Cable'), this.zone.numRate.toString());
          this.amount = (parseInt(this.service.cost) + parseInt(this.zone.cost));
          this.moras = JSON.parse(dd.value).moras;
          this.debts = JSON.parse(dd.value).debts;
          this.breakdown = this.moras > 0 ? `${this.moras} Pago(s): ${this.moras*this.amount} Lps` : `0 Pago(s): 0 Lps`;
          //Determinar si aplica la promocion
          if(moment().format("MM") === "05" && this.test == 2){
            this.boolEnero = parseInt(moment().format("DD")) > 7 ? this.debts < 2 : this.debts == 0;
            if(this.boolEnero === false) {
              this.warnMessage = 'Cliente tiene moras pendientes de meses anteriores, no aplica para la promocion';
            }else{
              this.warnMessage = '';
            }
          }else{
            this.boolEnero = false;
            this.warnMessage = '';
          }
        }
      },
      clientesMora() {
        //1 = agua, 2 = cable
        this.moraAgua = [];
        this.moraCable = [];
        let dateYear = moment().format("YYYY");
        let dateMonth = moment().format("MM");
        let dateDay = moment().format("DD");
        let yearInt = parseInt(dateYear);
        let monthInt = parseInt(dateMonth);
        let dayInt = parseInt(dateDay);
        this.clients = ipcRenderer.sendSync('get-clientsSync');
        this.clients.forEach((client) => {
          let agua = false;
          let cable = false;
          let isMora = true;
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
              if(currBillMonth === monthInt && currBillYear === yearInt) {
                isMora = false;
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
              }
            }else if(client.services.includes('Agua')){
              let joinMonth = parseInt(client.joinMonth);
              let joinYear = parseInt(client.joinYear);
              if(joinMonth === monthInt && joinYear === yearInt) {
                  this.moraAgua.push({client, moras: 1});
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
              if(currBillMonth >= monthInt && currBillYear === yearInt) {
                isMora = false;
              }else{
                let sameTime = false;
                let moras = 0;
                let debts = 0;
                while(!sameTime) {
                  
                  if(currBillMonth === 12){
                    currBillMonth = 1;
                    currBillYear++;
                  }else{
                    currBillMonth++;
                  }
                  if(currBillMonth === monthInt && currBillYear === yearInt){
                    if(dayInt >= 30 || (monthInt === 2 && dayInt >= 28)){
                      moras++;
                    }
                  }else{
                    moras++;
                  }
                  if((currBillMonth === monthInt-1 && currBillYear === yearInt)||(currBillMonth===12 && monthInt===1 && currBillYear === yearInt-1)){
                    if(dayInt > 7){
                      debts++;
                    }
                  }else if(!(currBillMonth === monthInt && currBillYear === yearInt)){
                    debts++;
                  }

                  if(currBillMonth === monthInt && currBillYear === yearInt) {
                    sameTime = true;
                  }
                }
                if(moras > 0){
                  this.moraCable.push({client, moras, debts});
                }
              }
            }else if(client.services.includes('Cable')) {
              let joinMonth = parseInt(client.joinMonth);
              let joinYear = parseInt(client.joinYear);
              if(joinMonth === monthInt && joinYear === yearInt) {
                  this.moraCable.push({client, moras: 1, debts: 0});
              }else{
                let sameTime = false;
                let moras = 0;
                let debts = 0;
                while(!sameTime){
                  if(joinMonth === 12){
                    joinMonth = 1;
                    joinYear++;
                  }else{
                    joinMonth++;
                  }
                  if(joinMonth === monthInt && joinYear === yearInt){
                    if(dayInt >= 30 || (monthInt === 2 && day >= 28)){
                      moras++;
                    }
                  }else{
                    moras++;
                  }
                  if((joinMonth === monthInt-1 && joinYear === yearInt)||(joinMonth===12 && monthInt===1 && joinYear === yearInt-1)){
                    if(dayInt > 7){
                      debts++;
                    }
                  }else if(!(joinMonth === monthInt && joinYear === yearInt)){
                    debts++;
                  }
                  if(joinMonth === monthInt && joinYear === yearInt){
                    sameTime = true;
                  }
                }
                this.moraCable.push({client, moras, debts});
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
        return null;
      }
    },
    beforeMount(){
      ipcRenderer.on('return-zone', (event, arg) => {
        this.zone = arg;
      });

      ipcRenderer.on('fetch-clients', (event, arg) => {
        this.clients = arg;
      });

      ipcRenderer.on('return-services-cost', (event,arg)=>{
        this.service = arg;
      });
      this.clientesMora();
    },
    mounted(){
      let dd = document.getElementById('clientdropdown');
      dd.onchange = ()=> { if(dd.selectedIndex) this.selectClient(); };
      let dateDay = moment().format("DD");
      if(parseInt(dateDay) > 7 && this.test==2){
        this.warning = 'Se aplicará cobro extra por mora (10Lps)';
      }
    }
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  .main, #contenido{
    padding-top: 50px;
  }
  .horizontal, .segments{
    text-align: center;
  }
  .fondo{
    background-color: rgb(27, 62, 71);
    background-size: cover;
    filter: blur(2px) brightness(170%) ;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  #header-cable{
    background-color: #FFCC00;
    box-shadow: inset 3px 3px 34px 6px rgba(0,0,0,0.75);
    text-align: center;
  }

  #header-agua{
    background-color: #58B7D2;
    box-shadow: inset 3px 3px 34px 6px rgba(0,0,0,0.75);
    text-align: center;
  }

  .franja{
    background-color: black;
    height: 25px;
  }
  #lock{
    height: 230px;
    width: 230px;
  }
  #formulario{
    background: rgba(0,0,0, .5);
  }
  label{
    color: white !important;
    font-size: 15px !important;
  }

  .breakdown {
    color: white;
  }

  .warning-message {
    color: red;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  }
/* *********************** MODAL*********************** */

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity 0.5s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-footer{
    align-items: flex-end;
    align-content: flex-end;
  }

  .modal-container {
    width: 800px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: lightgray;
    box-shadow: inset 3px 3px 34px 6px rgba(0,0,0,0.75)!important;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all 0.5s ease;
    font-family: Roboto !important;
    font-size: 18px;
  }

  .modal-header {
    margin-top: 0;
    color: black;
  }
  .modal-header span{
    font-size: 15px!important;
    color: white;
    font-family: Roboto !important;
  }

  .modal-body label{
    font-family: Roboto !important;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }


  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }




</style>
