<template>
  <div class="main">
    <div class="fondo"></div>
    <br>
    <div id="contenido">
      <div class="titulo">
        <div class="ui container">
          <br>
          <h1>Informacion del Negocio</h1>
          <h2>Aplicante para cuenta de credito</h2>
          <br>
        </div>
      </div>
      <div class="franja"></div>
      <div  id="formulario">
        <div class="ui container">
          <br>
          <div class="ui form">
            <div class="two fields">
              <div class="field">
                <label>Nombre de la Compañia: <i class="asterisk blue icon"></i></label>
                <input type="text" placeholder="Nombre de la Compañia">
              </div>
              <div class="field">
                <label>Correo Electronico: <i class="asterisk blue icon"></i></label>
                <input type="text" placeholder="Ej: nombre@ejemplo.com">
              </div>
            </div>
            <div class="inline fields">
              <div class="five wide field">
                <label>Telefono: <i class="asterisk blue icon"></i></label>
                <input type="number" placeholder="Codigo de Area">
              </div>
              <div class="eleven wide field">
                <input type="number" placeholder="Numero de Telefono">
              </div>
            </div>

            <div class="field">
              <label>Direccion:</label>
              <input type="text" placeholder="Direccion">
            </div>
            <div class="two fields">
              <div class="field">
                <label>Departamento:<i class="asterisk blue icon"></i></label>
                <input type="text" placeholder="Departamento">
              </div>
              <div class="field">
                <label>Ciudad:<i class="asterisk blue icon"></i> </label>
                <input type="text" placeholder="Ciudad">
              </div>
            </div>
          </div>
          <br>
          <button class="big ui button inverted orange">
            <i class="handshake big icon"></i>
            Ingresar Aplicacion
          </button>
          <br><br>
        </div>
      </div>


    </div>
    <br><br>
  </div>

</template>

<script>
  export default {
    name: 'formulario',
    components: {  },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      mounted(){
      }
    }
  }
</script>
<style scoped>
  .main, #contenido{
    padding-top: 50px;
  }
  .fondo{
    background: url("~@/assets/lightRow.jpeg");
    background-size: cover;
    filter: blur(5px) brightness(80%) ;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .titulo{
    background-color: #FFA300;
    box-shadow: inset 3px 3px 34px 6px rgba(0,0,0,0.75);

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
