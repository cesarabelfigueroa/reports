<template>
  <div id="app">
    <div class="ui massive fixed inverted borderless menu" id="navBar" >
      <div class="ui container" id="navBar">
        <a><img id="logo" src="~@/assets/unicredit_LOGO.jpeg" height="65px;" width="292px;" alt="UNICREDIT"></a>
      </div>
      <div class="right menu" id="opciones">
          <router-link  to="/"><a class="item">Logout</a></router-link>
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    name: 'reports'
  }
</script>

<style>
  @import '../../semantic/dist/semantic.css';
  @import url('https://fonts.googleapis.com/css?family=Quicksand');
  #navBar{
    background-color: black;
    padding-right: 5%;
  }
  #opciones{
      font-size: 23.2px;
  }

</style>
