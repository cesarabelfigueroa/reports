<template>
  <div class="principal">
     <div class="fondo"></div>
     <div class="ui container" id="contenedor">
       <div class="ui black inverted segment"><h1> <i class="setting icon"></i>Administración</h1></div>
       <div class="ui center aligned container">
         <div class="ui two inverted olive item menu">
           <a class="item" v-bind:class="{active: tabNumber===3}" v-on:click="tabSelected(3)"><h3><i class="suitcase icon"></i>Servicios</h3></a>
           <a class="item" v-bind:class="{active: tabNumber===4}" v-on:click="tabSelected(4)"><h3><i class="home icon"></i>Zonas</h3></a>
         </div>
       </div>
       <div class="tabContent">
         <!-- *********** SERVICE TAB *********** -->
         <div v-if="tabNumber==3">
           <div id="tableContainer">
             <table class="ui celled padded table">
               <!-- <col width="20%"> -->
               <col width="10%">
               <col width="50%">
               <col width="20%">
               <col width="20%">
               <thead class="tableHeader">
                 <tr>
                   <!-- <th>Identidad</th> -->
                   <th>Nombre</th>
                   <th>Descripción</th>
                   <th>Zona</th>
                   <th>Monto (Lps)</th>
                   <th>Modificar</th>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="(servicio, index) in services">
                   <!-- <td>{{servicio._id}}</td> -->
                   <td>{{servicio.name}}</td>
                   <td>{{servicio.description}}</td>
                   <td>{{servicio.zone}}</td>
                   <td>{{servicio.cost}}</td>
                   <td class="center aligned">
                     <button  v-on:click="modifyService(servicio._id,index)" class="circular ui teal icon button">
                       <i class="icon write"></i>
                     </button>
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
           <br>
           <!-- <form class="ui form">
             <div class="field">
               <label><i class="suitcase icon"></i>Nombre: <i class="asterisk blue icon"></i></label>
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
               <label>Zona: <i class="asterisk blue icon"></i></label>
               <select v-model="service.zone" class="ui dropdown" id="zonadropdown">
                 <option value="">Tipo de Zona</option>
                 <option v-for="(zona, index) in zones" :value="zona.name">{{zona.name}}</option>
               </select>
             </div>
             <div class="field">
               <label>Monto: <i class="asterisk blue icon"></i></label>
               <div class="ui left icon input">
                 <input type="number" v-model="service.cost" placeholder="Monto">
                 <i class="payment icon"></i>
               </div>
             </div>
           </form>
           <br>
           <button class="ui yellow button" id="nuevoServicio" v-on:click="submitService()"><i class="plus icon"></i>Modificar</button> -->
         </div>
         <!-- *********** ZONE TAB *********** -->
         <div v-if="tabNumber==4">
           <div id="tableContainer">
             <table class="ui celled padded table">
               <col width="20%">
               <col width="20%">
               <col width="40%">
               <col width="5%">
               <col width="5%">
               <thead class="tableHeader">
                 <tr>
                   <th>Identidad</th>
                   <th>Nombre</th>
                   <th>Descripción</th>
                   <th>Modificar</th>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="(zona, index) in zones">
                   <td>{{zona._id}}</td>
                   <td>{{zona.name}}</td>
                   <td>{{zona.description}}</td>
                   <td class="center aligned">
                     <button  v-on:click="modifyZone(zona._id, index)" class="circular ui teal icon button">
                       <i class="icon write"></i>
                     </button>
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </div>
     <Modal v-if="showModal" :title="title" :message="message" :mode="modeIndex" :zones="zones" :service="service" :zone="zone" :index="modalIndex" @close="showModal = false" @finish="handleClose()">

     </Modal>
  </div>
</template>


<script>

  const { ipcRenderer } = require('electron');
  import Modal from './Modal';

  export default {
    name: 'configuracion',

    data(){
      return {
        tabNumber: 3,
        service:{
          name: '',
          description: '',
          zone: '',
          cost: ''
        },
        zone:{
          name:'',
          description:''
        },
        zones: [],
        services: [],
        modalIndex: -1,
        showModal: false,
        message:'',
        modeIndex:3,
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
      tabSelected(tabNumber){
        this.tabNumber = tabNumber;
      },
      submitZone(){
          let name = this.zone.name.trim();
          let description = this.zone.description.trim();
          if(name!=''){
            const {ipcRenderer} = require('electron');
            this.zone = {
              name,
              description
            }
            ipcRenderer.send('create-zone', this.zone);
            this.message = 'Zona creada exitosamente';
            this.title = 'Nueva Zona';
            this.modalType(5);
          }else{
            this.message = 'Error, tiene que escoger un nombre';
            this.title = 'Error';
            this.modalType(5);
          }
      },
      deleteZone(_id, index) {
        this.clients.splice(index, 1);
        ipcRenderer.on('delete-zone-ret', (event, err) => {
          if(!err) {
            this.message = 'Removido con exito!';
            this.title = 'Eliminar Zona';
            this.modalType(5);
          } else {
            this.message = 'Error al eliminar';
            this.title = 'Eliminar Zona';
            this.modalType(5);
          }
        });
        ipcRenderer.send('delete-zone', _id);

      },
      modifyZone(_id, index){
        this.modalIndex = index;
        this.zone = Object.assign({}, this.zones[index]);
        this.modalType(this.tabNumber);
      },
      submitService(){
          let name = this.service.name.trim();
          let description = this.service.description.trim();
          let zone = this.service.zone.trim();
          let cost = this.service.cost.trim();
          this.service = {
            name,
            description,
            zone,
            cost
          }
          ipcRenderer.send('create-service', this.service);
      },
      removeService(_id, index){
        this.services.splice(index,1);
        ipcRenderer.on('delete-service-ret', (event, err) => {
          if(!err) {
            this.message = 'Removido con exito!';
            this.title = 'Eliminar Servicio';
            this.modalType(5);
          } else {
            this.message = 'Error al eliminar'+err;
            this.title = 'Eliminar Servicio';
            this.modalType(5);
          }
        });
        ipcRenderer.send('delete-service',_id);
      },
      modifyService(_id, index){
        this.modalIndex = index;
        this.service = Object.assign({}, this.services[index]);
        this.zone = this.service.zone;
        this.modalType(this.tabNumber);
      },
      handleClose(service, ind) {
        this.services[ind] = service;
        this.showModal = false;
        ipcRenderer.on('return-services',(event,arg)=>{
          this.services = arg;
        });

        ipcRenderer.on('return-zones',(event,arg)=>{
          this.zones = arg;
        });
        //Llamado a eventos que retornaran info del backend
        ipcRenderer.send('get-zones');
        ipcRenderer.send('get-services');
      },
      modalType(index){
        this.modeIndex = index;
        this.showModal = true;
      }
    },
    beforeMount(){
      //Inicializacion de listeners para obtener info del backend
      ipcRenderer.on('return-services',(event,arg)=>{
        this.services = arg;
      });

      ipcRenderer.on('return-zones',(event,arg)=>{
        this.zones = arg;
      });
      //Llamado a eventos que retornaran info del backend
      ipcRenderer.send('get-zones');
      ipcRenderer.send('get-services');
    }
  }
</script>
<style scoped>
  .principal{
    padding-top: 8%;
    padding-bottom: 3%;
  }
  #contenedor{
    min-height: 600px;
    width: 900px;
    color: white !important;
    background: rgba(0,0,0, .7);
    box-shadow: 0px 0px 23px 4px rgba(0,0,0,0.97);

  }
  .fondo{
    background: url("~@/assets/financePuzzle.jpg") no-repeat center center;
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
  label{
    color: white !important;
  }
  .tabContent{
    padding: 40px;
  }
</style>
