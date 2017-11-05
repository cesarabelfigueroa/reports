<template>
  <div class="fondo">
    <div class="ui container">
      <div class="ui three item menu">
        <a class="active item">Clientes en Mora</a>
        <a class="item">Ingreso diario</a>
        <a class="item">Ingreso Mensual</a>
      </div>
      <div class="ui yellow inverted segment"><h1>En Mora pago de Cable</h1></div>
      <div class="ui segments">
        <div class="ui segment">
          <p>1. Top</p>
        </div>
        <div class="ui segment">
          <p>2. Middle</p>
        </div>
        <div class="ui segment">
          <p>3. Middle</p>
        </div>
        <div class="ui segment">
          <p>4. Middle</p>
        </div>
        <div class="ui segment">
          <p>5. Bottom</p>
        </div>
      </div>
      <div class="ui teal inverted segment"><h1>En Mora pago de Agua</h1></div>
      <div class="ui segments">
        <div class="ui segment">
          <p>1. Top</p>
        </div>
        <div class="ui segment">
          <p>2. Middle</p>
        </div>
        <div class="ui segment">
          <p>3. Middle</p>
        </div>
        <div class="ui segment">
          <p>4. Middle</p>
        </div>
        <div class="ui segment">
          <p>5. Bottom</p>
        </div>
      </div>
    </div>
    <br>
  </div>

</template>

<script>
export default {
  name: 'reporteria',
  methods: {
    open(link){
      this.$electron.shell.openExternal(link)
    },
    mounted(){

    }

  }
}
</script>

<style>
  .fondo{
    background: linear-gradient(lightgray, white); /* Standard syntax */
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    padding-top: 100px;
  }

</style>
