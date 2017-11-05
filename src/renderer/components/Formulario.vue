<template>
  <div class="main">
    <div class="fondo"></div>
    <br>
    <div id="contenido">
      <div class="titulo">
        <div v-if="test==2" id="header-cable" class="ui container">
          <br>
          <h1><i class="big tv icon"></i>Pago Cable</h1>
          <h3 >*Por mora se cobran L.10 extra. (Se aplica despues del 7mo dia de cada mes)</h3>
          <br>
        </div>
        <div v-if="test==1" id="header-agua" class="ui container">
          <br>
          <h1><i class="big shower icon"></i>Pago Agua</h1>
          <h3>*No hay cobro extra por mora para este servicio</h3>
          <br>
        </div>
      </div>
      <div class="franja"></div>
      <div  id="formulario">
        <div class="ui container">
          <br>
          <div class="ui form">
            <div class="field">
              <label>Seleccionar Cliente: <i class="asterisk blue icon"></i></label>
              <select class="ui dropdown">
                <option value="">Codigo - Nombre</option>
                <option value="1">0000 - Maria Rodriguez</option>
                <option value="0">2020 - Jose Paz</option>
              </select>
            </div>
            <br>
            <div class="ui horizontal segments">
              <div class="ui segment">
                <h3>El monto total es de:</h3>
              </div>
              <div class="ui segment">
                <h3> 0.00 Lps</h3>
              </div>
            </div>
            <br>
            <div class="two fields">
              <div class="field">
                <label>Monto a Pagar (Lps): <i class="asterisk blue icon"></i></label>
                <input type="number" placeholder="Ej: 1000.00">
              </div>
            </div>
            <br>
            <button class="big ui button blue">
              <i class="handshake file word outline icon"></i>
              Generar Factura
            </button>
          </div>

          <br><br>
          <br>
        </div>
      </div>


    </div>
    <br><br>
  </div>

</template>

<script>
  export default {
    name: 'formulario',
    data() {
      return {
        mode : false
      }
    },
    components: {  },
    props: ['test'],
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }

    },
    mounted(){
      //$('.max.example .ui.normal.dropdown').dropdown({maxSelections: 3});

    }

  }
</script>
<style scoped>
  .main, #contenido{
    padding-top: 50px;
  }
  .horizontal, .segments{
    text-align: center;
  }
  .fondo{
    background: url("~@/assets/blueCity.jpg");
    background-size: cover;
    filter: blur(2px) brightness(170%) ;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  #header-cable{
    background-color: #FFCC00;
    box-shadow: inset 3px 3px 34px 6px rgba(0,0,0,0.75);
    text-align: center;
  }

  #header-agua{
    background-color: #58B7D2;
    box-shadow: inset 3px 3px 34px 6px rgba(0,0,0,0.75);
    text-align: center;
  }

  .franja{
    background-color: black;
    height: 25px;
  }
  #lock{
    height: 230px;
    width: 230px;
  }
  #formulario{
    background: rgba(0,0,0, .5);
  }
  label{
    color: white !important;
    font-size: 15px !important;
  }

</style>
