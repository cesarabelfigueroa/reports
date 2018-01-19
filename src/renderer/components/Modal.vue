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
                      <option v-for="(zona, index) in zones" :value="zona.name">{{zona.name}}</option>
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
                    <label>Seleccionar Cliente: <i class="asterisk blue icon"></i></label>
                    <select v-model="indexCliente" class="ui dropdown" id="clientdropdown">
                      <option :value="-1">Nombre del Cliente</option>
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
                  <button class="ui button yellow" v-on:click="verifyPromocion()">
                    <i class="handshake file word outline icon"></i>
                    Generar Factura
                  </button>
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
                    <label><i class="suitcase icon"></i>Nombre: <i class="asterisk olive icon"></i></label>
                    <select v-model="service.name" class="ui dropdown" id="servicioDropdown">
                      <option value="">Servicio</option>
                      <option value="Agua">Agua</option>
                      <option value="Cable">Cable</option>
                    </select>
                  </div>
                  <div class="field">
                    <label>Descripción: </label>
                    <div>
                      <textarea v-model="service.description" placeholder="Descripción" name="name" rows="3"></textarea>
                    </div>
                  </div>
                  <div class="field">
                    <label>Zona: <i class="asterisk olive icon"></i></label>
                    <select v-model="service.zone" class="ui dropdown" id="zonadropdown">
                      <option value="">Tipo de Zona</option>
                      <option v-for="(zona, index) in zones" :value="zona.name">{{zona.name}}</option>
                    </select>
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
                  <h1><i class="write olive icon"></i> Modificar datos de Zona</h1>
                </div>
                <hr>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <form class="ui form">
                  <div class="field">
                    <label>Nombre:  <i class="asterisk blue icon"></i></label>
                    <div class="ui left icon input">
                      <input type="text"  v-model="zone.name" placeholder="Nombre">
                      <i class="home icon"></i>
                    </div>
                  </div>
                  <div class="field">
                    <label>Descripción: </label>
                    <div>
                      <textarea v-model="zone.description" placeholder="Descripción" rows="3"></textarea>
                    </div>
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
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
  const { ipcRenderer } = require('electron');

  export default {
    name: 'modal',
    data() {
      return {
        amount: 0,
        indexCliente: -1,
        total: 0
      }
    },
    methods: {
      verifyPromocion() {
        console.log('Promocion');
      },
      modifyClient() {
        ipcRenderer.send('update-client', this.client);
        this.$emit('finish', this.client, this.index);
      },
      modifyService() {
        ipcRenderer.send('update-service', this.service);
        this.$emit('finish', this.service, this.index);
      },
      modifyZone() {
        ipcRenderer.send('update-zone', this.zone);
        this.$emit('finish', this.zone, this.index);
      }
    },
    props: ['mode', 'client', 'clients', 'zones', 'index', 'zone', 'service'],
    beforeMount() {
      this.amount = 0;
      this.total = 0;
      this.indexCliente = 0;
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

.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: gray;
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
