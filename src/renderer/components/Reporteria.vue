<template>
  <div class="fondo">
    <div class="ui container">
      <div class="ui three item menu">
        <a class="item" v-bind:class="{active: tabNumber===1}" v-on:click="tabSelected(1)">Clientes en Mora</a>
        <a class="item" v-bind:class="{active: tabNumber===2}" v-on:click="tabSelected(2)">Ingreso diario</a>
        <a class="item" v-bind:class="{active: tabNumber===3}" v-on:click="tabSelected(3)">Ingreso Mensual</a>
      </div>
      <button class="ui yellow button" id="nuevoCliente" v-on:click="verify">Crear</button>
      <!-- *********** PRIMERA TAB *********** -->
      <div v-if="tabNumber==1">
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
        <div class="ui blue inverted segment"><h1>En Mora pago de Agua</h1></div>
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
      <!-- *********** SEGUNDA TAB *********** -->
      <div v-else-if="tabNumber==2">

      </div>
      <!-- *********** TERCERA TAB *********** -->
      <div v-else="tabNumber==3">

      </div>

    </div>
    <br>
  </div>

</template>

<script>
export default {
  name: 'reporteria',
  data(){
    return {
      tabNumber:1
    }
  },
  methods: {
    open(link){
      this.$electron.shell.openExternal(link)
    },
    tabSelected(numero){
      console.log('55555');
      this.tabNumber = numero;
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
  .item:hover{
    cursor: pointer;
  }
</style>
