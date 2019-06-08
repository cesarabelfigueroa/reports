<template>
  <div class="principal">
    <div class="fondo"></div>
      <div class="ui center aligned container" id="contenedor">
      <div class="header-container">
        <div class="ui segment header-segment header-title">
          <h1 class="">Sistema de Pago</h1>
        </div>
      </div>
        <div class="ui two column grid menu-container">
          <div class="column">
            <router-link to="/formulario/1" test="hola">
              <div class="ui circular segment " id="menu1">
                <i class="huge shower icon"></i>
                <h1>
                  Agua
                </h1>
              </div>
            </router-link>
          </div>
          <div class="column">
            <router-link to="/formulario/2">
              <div class="ui circular segment" id="menu2">
                <i class="huge tv icon"></i>
                <h1>
                  Cable
                </h1>
              </div>
            </router-link>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      open(link){
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>

  .header-segment{
    color: white !important;
    background: black;
    box-shadow: 0px 0px 23px 4px rgba(0,0,0,0.97);
  }
  
  .header-container {
    position: absolute;
    top: 18%;
    left: 50%;
  }

  .header-title {
    position: relative;
    left: -50%; 
  }

  .fondo{
    background-color: white;
    background: linear-gradient(
      to right,
      #0E6EB8 0%,
      #0E6EB8 50%,
      #FFFFFE 50%,
      #FFFFFE 100%
    );
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .menu-container{
    position: relative;
    top: 60%;
  }
  .principal{
    padding-top: 15%;
  }
  .agua{
    color: #FFFFFE;
  }
  .cable{
    color: rgb(33, 133, 208);
  }
  #titulos{
    font-family: 'Quicksand', sans-serif;
    font-size: 30px;
  }
  .circular{
    height: 200px;
    width: 200px;
  }
  #menu1{
    background-color:#FFFFFE;
    color: rgb(33, 133, 208);
  }
  #menu2{
    background-color:rgb(33, 133, 208);
    color: #FFFFFE;
  }
  .circular:hover{
    color: white !important;
    transition: background-color 1s, width 0.5s, height 0.5s !important;
    transition-timing-function: ease-in-out;
    height: 220px;
    width: 220px;
    cursor: pointer;
  }
  #menu1:hover{
    background-color:#FFA300;
  }
  #menu2:hover{
    background-color:#FFA300;
  }
  .circular h2:hover{
    color: white !important;
  }

</style>
