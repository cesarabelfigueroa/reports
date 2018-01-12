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
                  <input type="text"  v-model="client.idnumber" placeholder="Numero de Identidad">
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
                <select class="ui dropdown" id="clientdropdown">
                  <option value="">Tipo de Zona</option>
                  <!-- <option v-for="(zona, index) in zonas" :value="zona._id">{{zona.nombre}}</option> -->
                </select>
              </div>
              <div class="field">
                <label>Servicios:  <i class="asterisk blue icon"></i></label>
                <div id='serviciosId'>
                  <input type="checkbox" id="cable" value="Cable" v-model="checkedServices">
                  <label for="cable">Cable</label>
                  <input type="checkbox" id="agua" value="Agua" v-model="checkedServices">
                  <label for="agua">Agua</label>
                  <br><br>
                  <span>Servicios Seleccionados: {{ checkedServices }}</span>
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
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cli, index) in clients">
                    <td>{{cli.idnumber}}</td>
                    <td>{{cli.firstname}}</td>
                    <td>{{cli.lastname}}</td>
                    <td>{{cli.email}}</td>
                    <td class="center aligned">
                      <button v-on:click="deleteClient(cli)" class="circular ui red icon button">
                        <i class="icon window close"></i>
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
          email: ''
        },
        clients: [],
        services: [],
        zones: [],
        checkedServices:[]
      }
    },
    components: {  },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      verify(){
        let idnumber = this.client.idnumber.trim();
        let firstname = this.client.firstname.trim();
        let lastname = this.client.lastname.trim();
        let email = this.client.email.trim();
        if(idnumber !== '' && firstname !== '' && lastname!=='' && email !== '' && /^\d{4}-?\d{4}-?\d{5}$/.test(idnumber)){
          const { ipcRenderer } = require('electron');
          this.client = {
            idnumber,
            firstname,
            lastname,
            email
          }
          ipcRenderer.send('create-client', this.client);
          alert('Cliente agregado exitosamente!');
          this.resetClient();
        }else{
          alert('Debe llenar todos los campos y asegurarse que sean validos');
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
      resetClient() {
        this.client = {
          idnumber: '',
          firstname: '',
          lastname: '',
          email: ''
        }
      },
      deleteClient(cliente){
        ipcRenderer.send('delete-client',cliente);
        ipcRenderer.send('get-clients');
        alert('Cliente eliminado exitosamente!');
      }

    },
    beforeMount(){
      ipcRenderer.on('return-clients', (event, arg) => {
        this.clients = arg;
      });

      ipcRenderer.send('get-clients');

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
    width: 800px;
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
    width: 700px;
    max-width: 900px;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: auto;
  }


</style>
