<template>
  <div id="app">
    <div class="ui massive fixed inverted borderless menu" id="navigationBar" >
      <div class="ui container" id="navBar">
        <a><img id="logo" src="~@/assets/unicredit_LOGO.jpeg"  width="295px;" alt="UNICREDIT"></a>
      </div>
      <div class="right menu" id="opciones">
          <router-link  to="/">
            <div class="menu-item"><a class="item"><i class="large home icon"></i>Inicio</a></div>
          </router-link>
          <router-link  to="/Cliente">
            <div class="menu-item"><a class="item"><i class="large add user icon"></i>+Cliente</a></div>
          </router-link>
          <router-link  to="/Reportes">
            <div class="menu-item">
              <a class="item"><i class="large add bar chart icon"></i>Reporteria</a>
            </div>
          </router-link>
          <!-- <router-link  to="/">
            <div class="menu-item">
              <a class="item"><i class="large sign out icon"></i>Logout</a>
            </div>
          </router-link> -->
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>

  export default {
    name: 'reports',
    data(){
      return {

      }
    }
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

  #navigationBar a {
    display: block;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
  }

  #navigationBar{
    background-color: black;
    overflow: hidden;
  }

  .menu-item{
    height: 100%;
  }

  a.item{
    width: 100%;
    height: 100%;
  }

</style>
