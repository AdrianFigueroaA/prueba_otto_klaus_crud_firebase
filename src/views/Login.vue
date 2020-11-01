<template>
  <div class="login">
    <form @submit.prevent="login" class="formulario">
      <h2>Login</h2>
      <input v-model="usuario" type="text" placeholder="Usuario" />
      <input v-model="contrasena" type="password" placeholder="Contraseña" />
      <v-btn
        class="ma-2"
        color="secondary"
        @click="loader = 'loading'"
        type="submit"
        value="ingresar"
      >
        ingresar
      </v-btn>

      <v-btn @click="logInGoogle" dark depressed color="blue accent-1">
      Login con Gmail
    </v-btn>
    </form>
    <div>
      <h1>user:revanskyw@gmail.com</h1>
      <h1>pass:12345678</h1>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      usuario: "",
      contrasena: "",
    };
  },

  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
        .then(
          (user) => this.$router.replace("home"),
          (error) => console.error(error)
        );
    },

     logInGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          this.$router.replace("home");
          let user = {
            name: result.user.displayName,
            photoURL: result.user.providerData[0].photoURL,
            email: result.user.email,
          };
          this.createdUser(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 
    
  },
};
</script>

<style lang="scss">
.formulario {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
}

.login{

  background: orange;
}

#app{

   background: orange;
}
</style>
