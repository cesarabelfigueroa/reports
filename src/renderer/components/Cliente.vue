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
                <label>Número de Identidad:  <i class="asterisk blue icon"></i></label>
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
                <label>Tarifa: <i class="asterisk blue icon"></i></label>
                <select v-model="client.zone" class="ui dropdown" id="zoneDropdown">
                  <option v-for="(zona, index) in zones" :value="zona.numRate.toString()">{{zona.numRate}}</option>
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
            <button class="ui olive button" id="nuevoCliente" v-on:click="JSONToXLSConvertor"><i class="plus icon"></i>Convertir a Excel</button>
            <br><br>
          </div>
            <!-- <ol>
              <li v-for="cli in clients">{{cli.idnumber}} - {{cli.firstname}} {{cli.lastname}} - {{cli.email}}</li>
            </ol> -->
          <div class="contentContainer">
            <div id="tableContainer" v-if="clients.length>0">
              <table id="tblData" class="ui celled padded table">
                <col width="30%">
                <col width="15%">
                <col width="15%">
                <col width="10%">
                <col width="10%">
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
                  <tr v-for="(cli, index) in clientesPagina">
                    <td>{{cli.idnumber}}</td>
                    <td>{{cli.firstname}}</td>
                    <td>{{cli.lastname}}</td>
                    <td>{{cli.email}}</td>
                    <td>{{cli.zone}}</td>
                    <td>
                      <div v-for="servicio in cli.services">
                        <p>{{servicio}} </p>
                      </div>
                    </td>
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
              <div>
                <span class="ui button" v-for="n in pag" v-on:click="paginar(n.i)">{{n.i}}</span>
              </div>
            </div>

            <p v-if="clients.length===0">No hay clientes registrados.</p>
          </div>


        </div>
      </div>
    </div>
    <Modal v-if="showModal" :title="title" :message="message" :mode="modeIndex" :client="client" :zones="zones" :index="clientIndex" @close="showModal = false" @finish="handleClose()" @answer="modalAnswer()">

    </Modal>
  </div>

</template>

<script>

  const { ipcRenderer } = require('electron');
  const moment = require('moment');
  import Modal from './Modal';
  let $ = require('jquery');
  

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
        pagina: 1,
        clientesPagina: [],
        pag: [],
        indexC:0,
        identidad:'',
        ids: [],
        showModal:false,
        clientIndex: -1,
        message:'',
        modeIndex:1,
        title:''
      }
    },
    components: {
      Modal: Modal
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

          if(idnumber !== '' && firstname !== '' && lastname!=='' && email !== '' && zone!==''){
            if (services.length>0 && /^\d{4}-?\d{4}-?\d{5}$/.test(idnumber)) {
              let joinDay = moment().format("DD");
              let joinMonth = moment().format("MM");
              let joinYear = moment().format("YYYY");
              this.client = {
                idnumber,
                firstname,
                lastname,
                email,
                zone,
                services,
                joinDay,
                joinMonth,
                joinYear
              }
              ipcRenderer.send('create-client', this.client);
              this.message = 'Cliente agregado exitosamente!';
              this.title = 'Nuevo Cliente';
              this.modalType(5);
              this.clients = ipcRenderer.sendSync('get-clientsSync');
              this.resetClient();
              this.paginar(1);
            }else {
              this.message = 'El número de identidad ingresado no es válido. [Ej: 1234-1234-12345]';
              this.title = 'Error';
              this.modalType(5);
            }
          }else{
            this.message = 'Debe llenar todos los campos';
            this.title = 'Error';
            this.modalType(5);
          }
        }else{
          this.message = 'Ya existe un cliente con ese numero de identidad.';
          this.title = 'Error';
          this.modalType(5);
        }
      },
      modalType(index){
        this.modeIndex = index;
        this.showModal = true;
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
        this.clientIndex = index;
        this.client = Object.assign({}, this.clients[index]);
        this.modalType(1);
      },
      closePromocion(){
        this.showModal = false;
        this.message = 'Factura ingresada con éxito';
        this.title = 'Alerta';
        this.modalType(5);
      },
      remove(_id, index) {
        // this.clients.splice(index, 1);
        // ipcRenderer.send('remove-client', _id);
        this.identidad = _id;
        this.indexC = index;
        this.message = 'Esta seguro que desea eliminar este cliente?';
        this.title = 'Alerta';
        this.modalType(6);
      },
      modalAnswer(){
        this.clients.splice(this.indexC, 1);
        ipcRenderer.send('remove-client', this.identidad);
      },
      resetClient() {
        this.client = {
          idnumber: '',
          firstname: '',
          lastname: '',
          email: '',
          services: [],
          zone: ''
        }
      },
      handleClose(cli, ind) {
        this.clients[ind] = cli;
        this.showModal = false;
        ipcRenderer.send('get-clients');

      },
      paginar(pagina) {
        this.pagina = pagina;
        this.clientesPagina = [];
        let totalRows = this.clients.length;
        let totalPages = Math.ceil(totalRows/15);
        let begin = (this.pagina-1)*15;
        let end = this.pagina*15 >= totalRows ? totalRows : this.pagina*15;
        for (let i = begin; i < end; i++) {
          this.clientesPagina.push(this.clients[i]);
        }
        if(totalPages != this.pag.length){
          this.pag = [];
          for (let i = 0; i < totalPages; i++) {
            this.pag.push({i: i+1});
          }
        }
      },
      JSONToXLSConvertor() {
        const JSONData = this.clients, ReportTitle = 'Clientes_Unicredit', ShowLabel=true;
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = 'Lista de Clientes' + '\r\n\n';
        if (ShowLabel) {
            var row = "";
            for (var index in arrData[0]) {
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        if (CSV == '') {        
            alert("Invalid data");
            return;
        }
        var fileName = ReportTitle.replace(/ /g,"_");
        var uri = 'data:text/xls;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");    
        link.href = uri;
        
        link.style = "visibility:hidden";
        link.download = fileName + ".xls";
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
      ipcRenderer.on('return-zones',(event,args)=>{
        this.zones = args;
      });
      this.clients = ipcRenderer.sendSync('get-clientsSync');
      ipcRenderer.on('return-zones',(event,args)=>{
        this.zones = args;
      });
      ipcRenderer.send('get-zones');

      ipcRenderer.on('remove-client-ret', (event, err) => {
        if(!err){
          this.message = 'Cliente eliminado con éxito!';
          this.title = 'Eliminar Cliente';
          this.modalType(5);
        }else{
          this.message = 'Error al eliminar cliente';
          this.title = 'Error';
          this.modalType(5);
        }
      });
      this.paginar(1);


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
    height: 100%;
  }

  .focus {
    background-color: #333333;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
  }

  .pageNumber {
    padding: 2px;
  }
  /* *********************** MODAL*********************** */




</style>
