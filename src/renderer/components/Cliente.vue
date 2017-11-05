<template>
  <div class="principal">
    <div class="fondo"></div>
    <div class="ui center aligned container" id="contenedor">
      <div class="ui inverted segment">
        <div class="ui inverted top attached tabular menu">
          <a v-bind:class="{active: activeTab==1}" data-tab="add" class="item" v-on:click="activeTab=1">
            Nuevo Cliente
          </a>
          <a v-bind:class="{active: activeTab==2}" data-tab="list" class="item" v-on:click="activeTab=2">
            Nuestros Clientes
          </a>
        </div>
      </div>
      <div class="tabContent">
        <div v-bind:class="{active : activeTab==1 }" v-bind:style="{display: activeTab==1}" data-tab="add"  class="ui bottom attached tab">
          <div class="">
            <h1><i class="user circle outline icon"></i>Nuevo Cliente</h1>
          </div>
          <div class="ui justified aligned container">
            <br><br><br>
            <form class="ui form">
              <div class="field">
                <label>Numero de Identidad: </label>
                <div class="ui left icon input">
                  <input type="text" placeholder="Numero de Identidad">
                  <i class="id card icon"></i>
                </div>
              </div>
              <div class="field">
                <label>Nombres: </label>
                <div class="ui left icon input">
                  <input type="text" placeholder="Nombres">
                  <i class="user icon"></i>
                </div>
              </div>
              <div class="field">
                <label>Apellidos: </label>
                <div class="ui left icon input">
                  <input type="text" placeholder="Apellidos">
                  <i class="user outline icon"></i>
                </div>
              </div>

            </form>
          </div>
          <br><br>
          <br>
          <router-link to="/home"><button class="ui yellow button" id="nuevoCliente">Crear</button></router-link>
        </div>
        <div class="ui bottom attached tab" v-bind:class="{active: activeTab==2}" v-bind:style="{display: activeTab==2}" data-tab="list">
          <h1>Test tabs</h1>
        </div> 
      </div>
       
    </div>
  </div>

</template>

<script>


  export default {
    name: 'cliente',
    data(){
      return {
        activeTab : 1
      }
    },
    components: {  },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    beforeMount(){
      $('.menu .item').tab();
      
    }
  }
</script>
<style scoped>
  .principal{
    padding-top: 8%;
  }
  #contenedor{
    height: 600px;
    width: 800px;
    color: white !important;
    background: rgba(0,0,0, .7);
    box-shadow: 0px 0px 23px 4px rgba(0,0,0,0.97);

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
</style>
