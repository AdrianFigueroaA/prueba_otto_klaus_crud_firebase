<template>
  <v-app>
 <v-app-bar
      app
      color="primary"
      dark
    >

      <v-spacer></v-spacer>
      
     <v-btn
      class="align-content-end"
      color="secondary"
      @click="logout"
    >
      Cerrar Session
    </v-btn>
      
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import { mapActions } from "vuex";
import firebase from 'firebase'
export default {
  name: 'App',



  // data: () => ({
  //   //
  // }),
  created () {
    this.getData();
  },
  methods: {
    ...mapActions("Datos", ["getData"])
  },

};
</script>