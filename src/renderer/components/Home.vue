<template>
  <div class="principal">
    <div class="fondo"></div>
      <div class="ui center aligned container" id="contenedor">
        <div class="ui two column grid">
          <div class="column">
            <router-link to="/formulario/1" test="hola">
              <div class="ui circular segment " id="menu1">
                <i class="huge shower icon"></i>
                <h1>
                  Agua
                </h1>
              </div>
            </router-link>
            <h2 class="agua">--------------------------
              <br>Información de Consumo</h2>
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
            <h2 class="cable">--------------------------
              <br>Información de Pago</h2>
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

  .fondo{
    background-color: white;
    background: linear-gradient(
      to right,
      #58B7D2 0%,
      #58B7D2 50%,
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
  .principal{
    padding-top: 15%;
  }
  .agua{
    color: #FFFFFE;
  }
  .cable{
    color: #58B7D2;
  }
  #titulos{
    font-family: 'Quicksand', sans-serif;
    font-size: 30px;
  }
  .circular, .segment{
    height: 200px;
    width: 200px;
  }
  #menu1{
    background-color:#FFFFFE;
    color: #58B7D2;
  }
  #menu2{
    background-color:#58B7D2;
    color: #FFFFFE;
  }
  .segment:hover{
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
  .segment h2:hover{
    color: white !important;
  }

</style>
