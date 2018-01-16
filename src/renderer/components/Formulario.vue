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
          <h2>{{warning}}</h2>
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
      <div  id="formulario">
        <div class="ui container">
          <br>
          <div class="ui form">
            <div class="field">
              <label>Seleccionar Cliente: <i class="asterisk blue icon"></i></label>
              <select v-model="indexCliente" class="ui dropdown" id="clientdropdown">
                <option value="">Nombre del Cliente</option>
                <option v-for="(client, index) in clients" :value="client.idnumber">{{client.firstname}} {{client.lastname}}</option>
              </select>
            </div>
            <br>
            <div class="ui horizontal segments">
              <div class="ui segment">
                <h3>Monto Total:</h3>
              </div>
              <div class="ui segment">
                <h3>{{total}}</h3>
              </div>
            </div>
            <br>
            <div class="two fields">
              <div class="field">
                <label>Monto a Pagar (Lps): <i class="asterisk blue icon"></i></label>
                <input type="number" v-model="amount" placeholder="Ej: 1000.00">
              </div>
            </div>
            <br>
            <button class="big ui button blue" v-on:click="verify">
              <i class="handshake file word outline icon"></i>
              Generar Factura
            </button>
            <div v-if="boolEnero==true" class="ui big yellow animated fade button" id="show-modal" @click="showModal = true">
              <div class="hidden content">Pago Anual</div>
              <div class="visible content">
                <i class="certificate icon"></i>Promoción
              </div>
            </div>
          </div>

          <br><br>
          <br>
        </div>
      </div>
    </div>
    <!-- ************************MODAL PROMOCION************************ -->
    <modal v-if="showModal" @close="showModal = false">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="">
                <div class="modal-header">
                  <slot name="header">
                    <div class="ui blue inverted segment">
                      <h1><i class="certificate yellow icon"></i> Pago Anual</h1>
                    </div>
                    <hr>
                    <div class="ui secondary inverted blue segment">
                      <span>Esta promoción solamente es válida en el mes de Enero. Al pagar el año entero, el cliente recibe un mes gratuito</span>
                    </div>

                  </slot>
                </div>

                <div class="modal-body">
                  <slot name="body">
                    <div class="ui form">
                      <div class="field">
                        <label>Seleccionar Cliente: <i class="asterisk blue icon"></i></label>
                        <select v-model="indexCliente"class="ui dropdown" id="clientdropdown">
                          <option value="">Nombre del Cliente</option>
                          <option v-for="(client, index) in clients" :value="index">{{client.firstname}} {{client.lastname}}</option>
                        </select>
                      </div>
                      <br>
                      <div class="ui horizontal segments">
                        <div class="ui segment">
                          <h3>Monto Anual:</h3>
                        </div>
                        <div class="ui segment">
                          <h3>{{total}}</h3>
                        </div>
                      </div>
                      <br>
                      <div class="two fields">
                        <div class="field">
                          <label>Monto a Pagar (Lps): <i class="asterisk blue icon"></i></label>
                          <input type="number" v-model="amount" placeholder="Ej: 1000.00">
                        </div>
                      </div>
                      <br>
                      <button class="ui button yellow" v-on:click="verify">
                        <i class="handshake file word outline icon"></i>
                        Generar Factura
                      </button>
                    </div>
                  </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    <div class="right aligned ui basic segment">
                      <button class="ui button red" @click="modalFuncion()">
                        Cancelar
                      </button>
                    </div>
                  </slot>
                </div>

              </div>
            </div>
          </div>
        </div>
      </transition>
    </modal>
    <br><br>
  </div>

</template>

<script>
  const { ipcRenderer } = require('electron');
  const moment = require('moment');

  export default {

    name: 'formulario',
    data() {
      return {
        mode : false,
        amount : 0,
        clients: [],
        fine: 0,
        day: 0,
        warning: 'No hay mora',
        showModal: false,
        boolEnero: false,
        indexCliente: 0,
        client: {
          idnumber: '',
          firstname: '',
          lastname: '',
          email: '',
          services:[],
          zone: ''
        },
        service:{
          name: '',
          description: '',
          zone: '',
          cost: ''
        }
      }
    },
    computed : {
      total: function () {
        return this.amount != '' ? parseInt(this.fine) + parseInt(this.amount) : parseInt(this.fine);

      },
      monto: function () {
        ipcRenderer.on('return-services-cost', (event,arg)=>{
          this.service = arg;
        });
        ipcRenderer.send('get-services-cost',this.clients[this.indexCliente].name,this.clients[this.indexCliente].zone);
        return parseInt(this.fine) + parseInt(this.service.cost);
      }
    },
    components: {  },
    props: ['test'],
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      modalFuncion(){
        this.showModal = false

      },
      verify() {
        console.log('Fine: ', this.fine);
        console.log('Amount: ', this.amount);
        console.log('Total: ', this.total);
        const dd = document.getElementById('clientdropdown');
        let client_id = dd.options[dd.selectedIndex].value;
        if(client_id !== '' && this.amount > 0){
          let service = this.test==1? 'agua' : 'cable';
          let day = moment().format("DD");
          if(parseInt(day) > 7 && this.test==2){
            this.fine = 10;
          }
          let dateYear = moment().format("YYYY");
          let dateMonth = moment().format("MM");
          let dateDay = moment().format("DD");
          let dateTime = moment().format("h:mm a");
          let bill = {
            client_id,
            service,
            amount: this.amount,
            fine: this.fine,
            dateYear,
            dateMonth,
            dateDay,
            dateTime
          }
          ipcRenderer.send('create-bill', bill);
          this.fine = 0;
          this.amount = 0;
          dd.selectedIndex = 0;
          alert('Factura ingresada con exito');
        }else{
          alert('Seleccione un cliente e ingrese un monto a pagar para poder realizar la facturacion');
        }
      }
    },
    beforeMount(){
      this.day = parseInt(moment().format("DD"));
      if(this.day>=7 && this.test===2) {
        this.warning = 'Se aplicará cobro extra por mora (10Lps)';
        this.fine = 10;
      }
      if ((parseInt(moment().format("MM")))== 1 ) {
        this.boolEnero = true;
      }
      ipcRenderer.on('fetch-clients', (event, arg) => {
        this.clients = arg;
      });
      ipcRenderer.send('get-clients');
    },
    mounted(){


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
    background: url("~@/assets/blueCity.jpg");
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
    transition: opacity 1s ease;
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
    transition: all 1s ease;
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
