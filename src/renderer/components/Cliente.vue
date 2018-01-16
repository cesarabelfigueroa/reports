<template>
  <div class="principal">
    <div class="fondo"></div>
    <div class="ui center aligned container" id="contenedor">
      <div class="ui inverted top attached tabular menu grid">
        <a class="item eight wide column" v-bind:class="{active : activeTab==1 }" v-on:click="change(1)" data-tab="add">Agregar Cliente</a>
        <a class="item eight wide column" v-bind:class="{active : activeTab==2 }" v-on:click="change(2)" data-tab="list">Nuestros Clientes</a>
      </div>
      <div class="tabContent">
        <div v-bind:class="{active : activeTab==1 }" v-bind:style="{display: activeTab==1}" data-tab="add"  class="ui bottom attached tab">
          <div class="contentHeader">
            <h1><i class="user circle outline icon"></i>Nuevo Cliente</h1>
          </div>
          <div class="ui justified aligned container">
            <br>
            <form class="ui form">
              <div class="field">
                <label>Numero de Identidad:  <i class="asterisk blue icon"></i></label>
                <div class="ui left icon input">
                  <input type="text"  v-model="client.idnumber" placeholder="Ej: 0801-1900-00000">
                  <i class="id card icon"></i>
                </div>
              </div>
              <div class="field">
                <label>Nombres:  <i class="asterisk blue icon"></i></label>
                <div class="ui left icon input">
                  <input type="text" v-model="client.firstname" placeholder="Nombres">
                  <i class="user icon"></i>
                </div>
              </div>
              <div class="field">
                <label>Apellidos:  <i class="asterisk blue icon"></i></label>
                <div class="ui left icon input">
                  <input type="text" v-model="client.lastname" placeholder="Apellidos">
                  <i class="user outline icon"></i>
                </div>
              </div>
              <div class="field">
                <label>Correo: <i class="asterisk blue icon"></i></label>
                <div class="ui left icon input">
                  <input type="text" v-model="client.email" placeholder="Correo">
                  <i class="mail icon"></i>
                </div>
              </div>
              <div class="field">
                <label>Zona: <i class="asterisk blue icon"></i></label>
                <select v-model="client.zone" class="ui dropdown" id="zoneDropdown">
                  <option v-for="(zona, index) in zones" :value="zona.name">{{zona.name}}</option>
                </select>
              </div>
              <div class="field">
                <label>Servicios {{ client.services }}:  <i class="asterisk blue icon"></i></label>
                <div id='serviciosId'>
                  <input type="checkbox" id="cable" value="Cable" v-model="client.services">
                  <label for="cable">Cable</label>
                  <br>
                  <input type="checkbox" id="agua" value="Agua" v-model="client.services">
                  <label for="agua">Agua</label>
                  <br><br>
                </div>
              </div>

            </form>
          </div>
          <br><br>
          <br>
          <button class="ui yellow button" id="nuevoCliente" v-on:click="verify"><i class="plus icon"></i>Crear</button>
        </div>
        <div class="ui bottom attached tab" v-bind:class="{active: activeTab==2}" v-bind:style="{display: activeTab==2}" data-tab="list">
          <div class="contentHeader">
            <h1><i class="user circle outline icon"></i>Lista de Clientes</h1>
            <!-- <ol>
              <li v-for="cli in clients">{{cli.idnumber}} - {{cli.firstname}} {{cli.lastname}} - {{cli.email}}</li>
            </ol> -->
            <div id="tableContainer" v-if="clients.length>0">
              <table class="ui celled padded table">
                <col width="26%">
                <col width="17%">
                <col width="17%">
                <col width="20%">
                <col width="10%">
                <col width="5%">
                <col width="5%">
                <thead class="tableHeader">
                  <tr>
                    <th>No. Identidad</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Zona</th>
                    <th>Servicios</th>
                    <th>Modificar</th>
                    <th>Eliminar</th>

                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cli, index) in clients">
                    <td>{{cli.idnumber}}</td>
                    <td>{{cli.firstname}}</td>
                    <td>{{cli.lastname}}</td>
                    <td>{{cli.email}}</td>
                    <td>{{cli.zone}}</td>
                    <td>{{cli.services}}</td>
                    <td class="center aligned">
                      <button  v-on:click="modifyContent(cli._id, index)" class="circular ui teal icon button">
                        <i class="icon write"></i>
                      </button>
                    </td>
                    <td class="center aligned">
                      <button  v-on:click="remove(cli._id, index)" class="circular ui red icon button">
                        <i class="icon remove"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-if="clients.length===0">No hay clientes registrados.</p>

          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>

  const { ipcRenderer } = require('electron');

  export default {
    name: 'cliente',
    data(){
      return {
        activeTab : 1,
        client: {
          idnumber: '',
          firstname: '',
          lastname: '',
          email: '',
          services:[],
          zone: ''
        },
        clients: [],
        zones: [],
        ids: [],
        showModal:false
      }
    },
    components: {

    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      verify(){
        let idnumber = this.client.idnumber.trim();
        if(!this.ids.includes(idnumber)){
          this.ids.push(idnumber);
          let firstname = this.client.firstname.trim();
          let lastname = this.client.lastname.trim();
          let email = this.client.email.trim();
          let zone = this.client.zone;
          let services = this.client.services;
          if(idnumber !== '' && firstname !== '' && lastname!=='' && email !== '' && zone!=='' && services.length>0 && /^\d{4}-?\d{4}-?\d{5}$/.test(idnumber)){
            this.client = {
              idnumber,
              firstname,
              lastname,
              email,
              zone,
              services
            }
            ipcRenderer.send('create-client', this.client);
            alert('Cliente agregado exitosamente!');
            this.resetClient();

          }else{
            alert('Debe llenar todos los campos y asegurarse que sean validos');
          }
        }else{
          alert('Ya existe un cliente con ese numero de identidad.');
        }
      },
      change(activetab) {
        this.activeTab = activetab;
        if(activetab == 1) {
          this.resetClient();
        }else{
          ipcRenderer.send('get-clients');
        }
      },
      modifyContent(_id, index) {
        this.client = this.clients[index];
        this.showModal = true
      },
      modify(){

      },
      remove(_id, index) {
        this.clients.splice(index, 1);
        ipcRenderer.send('remove-client', _id);
      },
      resetClient() {
        this.client = {
          idnumber: '',
          firstname: '',
          lastname: '',
          email: ''
        }
      }

    },
    beforeMount(){
      this.clients = [];
      this.ids = [];
      ipcRenderer.on('fetch-clients', (event, arg) => {
        this.clients = arg;
        for (var key in this.clients) {
            if (this.clients.hasOwnProperty(key)) {
                this.ids.push(this.clients[key].idnumber);
            }
        }
      });
      ipcRenderer.send('get-clients');
      ipcRenderer.on('return-zones',(event,args)=>{
        this.zones = args;
      });
      ipcRenderer.send('get-zones');

      ipcRenderer.on('remove-client-ret', (event, err) => {
        if(!err){
          alert('Cliente eliminado con exito!');
        }else{
          alert('Error al eliminar cliente', err); //err solo para debugging
        }
      });
    }
  }
</script>
<style scoped>

  .principal{
    padding-top: 8%;
    padding-bottom: 3%;
  }

  #contenedor{
    height: 700px;
    width: 1000px;
    color: white !important;
    background: rgba(0,0,0, .7);
    box-shadow: 0px 0px 23px 4px rgba(0,0,0,0.97);
  }
  .contentHeader {
      padding-top: 2rem;
  }

  #serviciosId label{
    font-size: 15px !important;
  }

  .tabContent{
    padding-left: 60px;
    padding-right: 60px;
  }

  .fondo{
    background: url("~@/assets/mathParty.jpg") no-repeat center center;
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  #nuevoCliente{
    padding-left: 125px;
    padding-right: 125px;
  }

  label{
    color: white !important;
  }

  #tableContainer {
    position: absolute;
    height: 500px;
    width: 900px;
    max-width: 900px;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: auto;
  }

  table {
    width: 100%;
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
      background-color: gray;
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
