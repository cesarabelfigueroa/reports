<template>
  <div class="main">
    <div class="fondo"></div>
    <br>
    <div id="contenido">
      <div class="titulo">
        <div v-if="test==2" id="header-cable" class="ui container">
          <br>
          <h1><i class="big tv icon"></i>Pago Cable</h1>
          <h3 >*Por mora se cobran L.10 extra. (Se aplica despues del 7mo dia de cada mes)</h3>
          <br>
        </div>
        <div v-if="test==1" id="header-agua" class="ui container">
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
              <select class="ui dropdown" id="clientdropdown">
                <option value="">Nombre del Cliente</option>
                <option v-for="(client, index) in clients" :value="client._id">{{client.firstname}}</option>
              </select>
            </div>
            <br>
            <div class="ui horizontal segments">
              <div class="ui segment">
                <h3>El monto total es de:</h3>
              </div>
              <div class="ui segment">
                <h3> {{amount}} Lps</h3>
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
          </div>

          <br><br>
          <br>
        </div>
      </div>


    </div>
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
        fine: 0

      }
    },
    components: {  },
    props: ['test'],
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      verify() {
        const dd = document.getElementById('clientdropdown');
        let client_id = dd.options[dd.selectedIndex].value;
        if(client_id !== '' && this.amount > 0){
          let service = this.test===1? 'agua' : 'cable';

          let day = moment().format("DD");
          if(parseInt(day) > 7 && service==2){
            this.fine = 10;
          }
          let date = moment().format("DD-MM-YYYY hh:mm:ssa");
          let bill = {
            client_id,
            service,
            amount: this.amount,
            fine: this.fine,
            date
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
      ipcRenderer.on('return-clients', (event, arg) => {
        this.clients = arg;
      });
      ipcRenderer.send('get-clients');

    },
    mounted(){
      //$('.max.example .ui.normal.dropdown').dropdown({maxSelections: 3});

    }

  }
</script>
<style scoped>
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

</style>
