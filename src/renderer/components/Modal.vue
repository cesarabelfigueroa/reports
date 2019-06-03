<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <!--Cliente-->
          <div v-if="mode==1" class="">
            <div class="modal-header">
              <slot name="header">
                <div class="ui inverted segment">
                  <h1><i class="write olive icon"></i> Modificar datos de Cliente</h1>
                </div>
                <hr>

              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <form class="ui form">
                  <div class="field">
                    <label>Numero de Identidad:  <i class="asterisk olive icon"></i></label>
                    <div class="ui left icon input">
                      <input type="text"  v-model="client.idnumber" placeholder="Ej: 0801-1900-00000">
                      <i class="id card icon"></i>
                    </div>
                  </div>
                  <div class="field">
                    <label>Nombres:  <i class="asterisk olive icon"></i></label>
                    <div class="ui left icon input">
                      <input type="text" v-model="client.firstname" placeholder="Nombres">
                      <i class="user icon"></i>
                    </div>
                  </div>
                  <div class="field">
                    <label>Apellidos:  <i class="asterisk olive icon"></i></label>
                    <div class="ui left icon input">
                      <input type="text" v-model="client.lastname" placeholder="Apellidos">
                      <i class="user outline icon"></i>
                    </div>
                  </div>
                  <div class="field">
                    <label>Correo: <i class="asterisk olive icon"></i></label>
                    <div class="ui left icon input">
                      <input type="text" v-model="client.email" placeholder="Correo">
                      <i class="mail icon"></i>
                    </div>
                  </div>
                  <div class="field">
                    <label>Zona: <i class="asterisk olive icon"></i></label>
                    <select v-model="client.zone" class="ui dropdown" id="zoneDropdown">
                      <option v-for="(zona, index) in zones" v-bind:key="index" :value="zona.name">{{zona.name}}</option>
                    </select>
                  </div>
                  <div class="field">
                    <label>Servicios {{ client.services }}:  <i class="asterisk olive icon"></i></label>
                    <div id='serviciosId'>
                      <input type="checkbox" id="cable" value="Cable" v-model="client.services">
                      <label for="cable">Cable</label>
                      <br>
                      <input type="checkbox" id="agua" value="Agua" v-model="client.services">
                      <label for="agua">Agua</label>
                    </div>
                  </div>

                </form>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <div class="right aligned ui basic segment">
                  <button class="ui button olive" v-on:click="modifyClient()">
                    Guardar
                  </button>
                  <button class="ui button red" v-on:click="$emit('close')">
                    Cancelar
                  </button>
                </div>
              </slot>
            </div>

          </div>
          <!--Formulario-->
          <div v-if="mode==2" class="">
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
                    <!-- <label>Seleccionar Cliente: <i class="asterisk blue icon"></i></label>
                    <select class="ui dropdown" id="clientedropdownModal">
                      <option value="">Nombre del Cliente</option>
                      <option v-for="(cliente, index) in currentClients" v-bind:key="index"  :value="JSON.stringify(cliente)">{{cliente.firstname}} {{cliente.lastname}}</option>
                    </select> -->
                    <h4><label>Nombre: {{client.firstname}} {{client.lastname}}   Identidad: {{client.idnumber}}</label></h4>
                  </div>
                  <br>
                  <div class="two fields">
                    <div class="field">
                      <h4><label>Monto mensual del cliente: {{amount}} Lps.</label></h4>
                    </div>
                  </div>
                  <div class="ui horizontal segments">
                    <div class="ui segment">
                      <h3>Monto Anual:</h3>
                    </div>
                    <div class="ui segment">
                      <h3>{{total}} Lps</h3>
                    </div>
                  </div>
                  <button class="ui button yellow" v-on:click="verifyPromocion()">
                    <i class="handshake file word outline icon"></i>
                    Generar Factura
                  </button>
                  <div v-if="validacionBool" class="ui small red inverted segment">
                    <h5><i class="remove icon"></i> Error! Seleccionar Cliente</h5>
                  </div>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="right aligned ui basic segment">
                  <button class="ui button red" v-on:click="$emit('close')">
                    Cancelar
                  </button>
                </div>
              </slot>
            </div>
          </div>
          <!-- Servicio -->
          <div v-if="mode==3" class="">
            <div class="modal-header">
              <slot name="header">
                <div class="ui inverted segment">
                  <h1><i class="write olive icon"></i> Modificar datos de Servicio</h1>
                </div>
                <hr>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <form class="ui form">
                  <div class="field">
                    <label>Nombre: </label>
                    <div class="ui segment">
                      <h5>{{service.name}}</h5>
                    </div>
                  </div>
                  <div class="field">
                    <label>Descripción: </label>
                    <div>
                      <textarea v-model="service.description" placeholder="Descripción" name="name" rows="3"></textarea>
                    </div>
                  </div>
                  <div class="field">
                    <label>Zona: </label>
                    <div class="ui segment">
                      <h5>{{service.zone}}</h5>
                    </div>
                  </div>
                  <div class="field">
                    <label>Monto: <i class="asterisk olive icon"></i></label>
                    <div class="ui left icon input">
                      <input type="number" v-model="service.cost" placeholder="Monto">
                      <i class="payment icon"></i>
                    </div>
                  </div>
                </form>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div v-if="validacionBool" class="ui small red inverted segment">
                  <h5><i class="remove icon"></i> Error! Llenar los campos obligatorios</h5>
                </div>
                <div class="right aligned ui basic segment">
                  <button class="ui button olive" v-on:click="modifyService()">
                    Guardar
                  </button>
                  <button class="ui button red" v-on:click="$emit('close')">
                    Cancelar
                  </button>
                </div>
              </slot>
            </div>

          </div>
          <!-- Zona -->
          <div v-if="mode==4" class="">
            <div class="modal-header">
              <slot name="header">
                <div class="ui inverted segment">
                  <h1><i class="write olive icon"></i> Modificar datos de Tarifa</h1>
                </div>
                <hr>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <form class="ui form">
                  <div class="field">
                    <label>Tarifa  {{zone.numRate}}<i class="asterisk blue icon"></i></label>
                    <div class="ui left icon input" id="zonaLabel">
                      <h4><i class="home icon"></i></h4>
                    </div>
                  </div>
                  <div class="field">
                    <label>Descripción: </label>
                    <div>
                      <textarea v-model="zone.description" placeholder="Descripción" rows="3"></textarea>
                    </div>
                  </div>
                  <div class="field">
                    <label>Monto(Lps): </label>
                    <input type="number" v-model="zone.cost"/>
                  </div>
                </form>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="right aligned ui basic segment">
                  <button class="ui button olive" v-on:click="modifyZone()">
                    Guardar
                  </button>
                  <button class="ui button red" v-on:click="$emit('close')">
                    Cancelar
                  </button>
                </div>
              </slot>
            </div>
          </div>
          <!-- Alerta -->
          <div v-if="mode==5" class="alerta">
            <div class="modal-header">
              <slot name="header">
                <div class="ui inverted segment">
                  <h1><i class="info circle olive icon"></i> {{title}} </h1>
                </div>
                <hr>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div class="ui basic segment" id="bodyModal">
                  <h3>{{message}}</h3>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="right aligned ui basic segment">
                  <button class="ui button olive" v-on:click="$emit('close')">
                    Ok
                  </button>
                </div>
              </slot>
            </div>
          </div>
          <!-- Response Alert (Yes/No) -->
          <div v-if="mode==6" class="alerta">
            <div class="modal-header">
              <slot name="header">
                <div class="ui inverted segment">
                  <h1><i class="info circle olive icon"></i> {{title}} </h1>
                </div>
                <hr>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div class="ui basic segment" id="bodyModal">
                  <h3>{{message}}</h3>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="right aligned ui basic segment">
                  <button class="ui button olive" v-on:click="respuestaModal()">
                    Si
                  </button>
                  <button class="ui button red" v-on:click="$emit('close')">
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
</template>


<script>
  const { ipcRenderer } = require('electron');
  const moment = require('moment');
  export default {
    name: 'modal',
    data() {
      return {
        amount: 0,
        indexCliente: -1,
        validacionBool:false
      }
    },
    computed : {
      total: function () {
        return this.amount != '' ? (parseInt(this.amount)*11) : 0;
      },
      currentClients: function () {
        return this.clients.filter((cliente)=> cliente.services.includes(this.test ==  1 ? 'Agua' : 'Cable'))
      }
    },
    methods: {
      modifyClient() {
        ipcRenderer.send('update-client', this.client);
        this.$emit('finish', this.client, this.index);
      },
      modifyService() {
        console.log('aqui si');
        let name = this.service.name.trim();
        let zone = this.service.zone;
        let cost = this.service.cost.trim();
        console.log(name+ ' '+zone+ ' '+cost);
        if (name!='' && zone!='' && cost!='') {
          ipcRenderer.send('update-service', this.service);
          this.$emit('finish', this.service, this.index);
        }else{
          this.validacionBool = true;
        }
      },
      modifyZone() {
        ipcRenderer.send('update-zone', this.zone);
        this.$emit('finish', this.zone, this.index);
      },
      respuestaModal(){
        this.$emit('answer');
        this.$emit('close');
      },
      verifyPromocion() {
        let client_id = this.client.idnumber;
        
        if(client_id !== '' && this.amount > 10){
          this.validacionBool= false;
          let service = this.test==1? 'agua' : 'cable';
          let dateYear = moment().format("YYYY");
          let dateMonth = moment().month(0).format("MM");
          let dateDay = moment().format("DD");
          let dateTime = moment().format("h:mm a");
          let fine = 0;
          let amount = parseInt(this.amount);
          if(parseInt(dateDay) > 7 && this.test==2){
            fine = 10;
          }
          // **************** Factura ****************
          // console.log('Date: ', dateDay+' '+dateMonth+' '+dateYear );
          // console.log('Total: ', this.total);
          // console.log('Nombre: ', (JSON.parse(dd.options[dd.selectedIndex].value)).firstname, (JSON.parse(dd.options[dd.selectedIndex].value)).lastname);
          // **************** Factura ****************
          
          let bill = {
            client_id,
            service,
            amount,
            fine,
            dateYear,
            dateMonth,
            dateDay,
            dateTime
          }
          let newBills = [ bill ];
          for(let i = 0; i < 11; i++) {
            let tempBill = {
              client_id,
              service,
              amount: (i+1 === 11) ? 0 : amount,
              fine: 0,
              dateYear,
              dateMonth: moment().month(i+1).format("MM"),
              dateDay: moment().date(1).format("DD"),
              dateTime
            }
            newBills.push(tempBill);
          }
          ipcRenderer.send('create-promotion-bills', newBills);
          this.amount = 0;
          this.$emit('finish');
        }else{
          this.validacionBool= true;
        }
      }
    },
    props: ['mode', 'client', 'clients', 'zones', 'index', 'zone', 'service', 'message', 'title', 'test'],
    beforeMount() {
      this.amount = 0;
      this.indexCliente = 0;
      if(this.mode == 2) {
        let servicio = ipcRenderer.sendSync('get-services-cost',(this.test==1 ? 'Agua' : 'Cable'), this.client.zone);
        this.amount = parseInt(servicio.cost);
      }
    },
    mounted(){
      // let dd = document.getElementById('clientedropdownModal');
      // if(dd)
      //   dd.onchange =()=> { if(dd.selectedIndex) this.selectClient(); };
    }
  }
</script>

<style>
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


.modal-mask .alerta {
  transition: opacity 0.3s ease !important;
}
.modal-container .alerta{
  transition: all 0.3s ease !important;
}

#bodyModal h3{
  color: white!important;
}
#zonaLabel h4{
  color: white!important;
}
div .modal-container{
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: gray;
  box-shadow: inset 3px 3px 34px 6px rgba(0,0,0,0.75);
  border-radius: 2px!important;
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
