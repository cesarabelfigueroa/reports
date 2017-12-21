<template>
  <div class="principal">
     <div class="fondo"></div>
     <div class="ui center aligned container" id="contenedor">
       <div class="ui center aligned container">
         <div class="">
           <h1>Login</h1>
         </div>
          <div class="ui justified aligned container">
            <br><br><br>
            <form class="ui form">
              <div class="field">
                <label>Usuario: </label>
                <div class="ui left icon input">
                  <input type="text" v-model="username" placeholder="Usuario">
                  <i class="user icon"></i>
                </div>
              </div>
              <br>
              <div class="field">
                <label>Contraseña:</label>
                <div class="ui left icon input">
                  <input type="password" v-model="password" placeholder="Contraseña">
                  <i class="lock icon"></i>
                </div>
              </div>
            </form>
          </div>
          <br><br>
            <p href="#">¿Olvidaste tu contraseña?</p>
          <br>
          <button class="ui yellow button" id="login" v-on:click="verify">Inicio</button>
       </div>
     </div>
  </div>
</template>


<script>

  import Datastore from 'nedb';


  export default {
    name: 'login',
    data(){
      return {
        username: '',
        password: ''

      }
    },
    components: {  },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      verify(){

        var users = new Datastore({ filename: './storage/users.json', autoload: true }); // LLAMAN LA TABLA

        var scott = {  
          name: 'Scott',
          twitter: '@ScottWRobinson'
        };


        //Corren la query y ya, ese es el backend
        users.insert(scott, function(err, doc) {  
          console.log('Inserted', doc.name, 'with ID', doc._id);
        });



       /* if(this.username == '' || this.password == ''){
          swal('Debe ingresar un usuario y una contraseña!','','warning');
        }else{
          this.$router.push('/home');
        } */
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
