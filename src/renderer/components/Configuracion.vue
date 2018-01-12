<template>
  <div class="principal">
     <div class="fondo"></div>
     <div class="ui container" id="contenedor">
       <div class="ui black inverted segment"><h1> <i class="setting icon"></i>Administración</h1></div>
       <div class="ui center aligned container">
         <div class="ui two inverted olive item menu">
           <a class="item" v-bind:class="{active: tabNumber===1}" v-on:click="tabSelected(1)"><h3><i class="suitcase icon"></i>Servicios</h3></a>
           <a class="item" v-bind:class="{active: tabNumber===2}" v-on:click="tabSelected(2)"><h3><i class="home icon"></i>Zonas</h3></a>
         </div>
       </div>
       <div class="tabContent">
         <!-- *********** SERVICE TAB *********** -->
         <div v-if="tabNumber==1">
           <div id="tableContainer">
             <table class="ui celled padded table">
               <col width="20%">
               <col width="15%">
               <col width="35%">
               <col width="10%">
               <col width="20%">
               <thead class="tableHeader">
                 <tr>
                   <th>Identidad</th>
                   <th>Nombre</th>
                   <th>Descripción</th>
                   <th>Zona</th>
                   <th>Monto</th>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="(servicio, index) in services">
                   <td>{{servicio._id}}</td>
                   <td>{{servicio.name}}</td>
                   <td>{{servicio.description}}</td>
                   <td>{{servicio.zone}}</td>
                   <td>{{servicio.cost}}</td>
                 </tr>
               </tbody>
             </table>
           </div>
           <form class="ui form">
             <div class="field">
               <label>Nombre:  <i class="asterisk blue icon"></i></label>
               <div class="ui left icon input">
                 <input type="text"  v-model="service.name" placeholder="Nombre">
                 <i class="suitcase icon"></i>
               </div>
             </div>
             <div class="field">
               <label>Descripción: </label>
               <div>
                 <textarea v-model="service.description" placeholder="Descripción" name="name" rows="3"></textarea>
               </div>
             </div>
             <div class="field">
               <label>Zona: <i class="asterisk blue icon"></i></label>
               <select class="ui dropdown" id="zonadropdown">
                 <option value="">Tipo de Zona</option>
                 <option v-for="(zona, index) in zones" :value="zona._id">{{zona.name}}</option>
               </select>
             </div>
             <div class="field">
               <label>Monto: <i class="asterisk blue icon"></i></label>
               <div class="ui left icon input">
                 <input type="text" v-model="service.cost" placeholder="Monto">
                 <i class="payment icon"></i>
               </div>
             </div>
           </form>
           <br>
           <button class="ui yellow button" id="nuevoServicio" v-on:click="submitService()"><i class="plus icon"></i>Modificar</button>
         </div>
         <!-- *********** ZONE TAB *********** -->
         <div v-if="tabNumber==2">
           <div id="tableContainer">
             <table class="ui celled padded table">
               <col width="20%">
               <col width="20%">
               <col width="50%">
               <thead class="tableHeader">
                 <tr>
                   <th>Identidad</th>
                   <th>Nombre</th>
                   <th>Descripción</th>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="(zona, index) in zones">
                   <td>{{zona._id}}</td>
                   <td>{{zona.name}}</td>
                   <td>{{zona.description}}</td>
                 </tr>
               </tbody>
             </table>
           </div>
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
           <br>
           <button class="ui yellow button" id="nuevaZona" v-on:click="submitZone()" ><i class="plus icon"></i>Modificar</button>
         </div>
       </div>
     </div>
  </div>
</template>


<script>

  const { ipcRenderer } = require('electron');


  export default {
    name: 'configuracion',
    data(){
      return {
        tabNumber: 1,
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
        services: []
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      tabSelected(tabNumber){
        this.tabNumber = tabNumber;
      },
      submitService(){
          let name = this.service.name.trim();
          let description = this.service.description.trim();
          let zone = this.service.description.trim();
          let cost = this.service.cost.trim();
          this.service = {
            name,
            description,
            zone,
            cost
          }
          ipcRenderer.send('create-service', this.service);
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
            alert('Zona creada exitosamente');
          }else{
            alert('Error, tiene que escoger un nombre');
          }
      }

    },
    beforeMount(){
      ipcRenderer.on('return-services',(event,arg)=>{
        this.services = arg;
      });
      ipcRenderer.send('get-services');
      ipcRenderer.on('return-zones',(event,arg)=>{
        this.zones = arg;
      });
      ipcRenderer.send('get-zones');
    }
  }
</script>
<style scoped>
  .principal{
    padding-top: 8%;
  }
  #contenedor{
    height: 600px;
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
