<template>
  <div class="principal">
    <div class="fondo"></div>
      <div class="ui center aligned container" id="contenedor">
        <div class="ui two column grid">
          <div class="column">
            <router-link to="/formulario">
              <div class="ui circular segment " id="menu1">
                <i class="huge plus icon"></i>
                <h1>
                  Nuevo Registro
                </h1>
              </div>
            </router-link>
          </div>
          <div class="column">
            <router-link to="/">
              <div class="ui circular segment" id="menu2">
                <i class="huge archive icon"></i>
                <h1>
                  Mis registros
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

  .fondo{
    background-color: white;
    background: linear-gradient(gray, white); /* Standard syntax */
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

  #titulos{
    font-family: 'Quicksand', sans-serif;
    font-size: 30px;
  }
  .circular, .segment{
    height: 300px;
    width: 300px;
  }
  #menu1{
    background-color:#FFCC00;
  }
  #menu2{
    background-color:#58B7D2;
  }
  .segment:hover{
    color: white !important;
    transition: background-color 1s, width 0.5s, height 0.5s !important;
    transition-timing-function: ease-in-out;
    height: 310px;
    width: 310px;
    cursor: pointer;
  }
  #menu1:hover{
    background-color:#FFA300;
  }
  #menu2:hover{
    background-color:#00DBEE;
  }
  .segment h2:hover{
    color: white !important;
  }

</style>
