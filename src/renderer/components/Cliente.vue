<template>
  <div class="principal">
     <div class="fondo"></div>
     <div class="ui center aligned container" id="contenedor">
       <div class="ui center aligned container">
         <div class="">
           <h1>Nuevo Cliente</h1>
         </div>
          <div class="ui justified aligned container">
            <br><br><br>
            <form class="ui form">
              <div class="field">
                <label>Codigo: </label>
                <div class="ui left icon input">
                  <input type="text" placeholder="Codigo">
                  <i class="barcode icon"></i>
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
                  <i class="user icon"></i>
                </div>
              </div>

            </form>
          </div>
          <br><br>
          <br>
          <router-link to="/home"><button class="ui yellow button" id="login">Crear</button></router-link>
       </div>
     </div>
  </div>

</template>

<script>


  export default {
    name: 'cliente',
    components: {  },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>
<style scoped>
  .principal{
    padding-top: 10%;
  }
  #contenedor{
    height: 500px;
    width: 400px;
    color: white !important;
    background: rgba(0,0,0, .7);
    box-shadow: 0px 0px 23px 4px rgba(0,0,0,0.97);
    padding: 40px;
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
  #login{
    padding-left: 125px;
    padding-right: 125px;
  }
  label{
    color: white !important;
  }
</style>
