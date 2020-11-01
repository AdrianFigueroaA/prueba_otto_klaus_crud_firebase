<template>
  <v-app>
    <h1>Inventario Otto Klaus</h1>
 
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

  created () {
    this.getData();
  },

  
  methods: {
    ...mapActions("Datos", ["getData"])
  },

};
</script>

<style lang="scss">
h1{

  text-align: center;
}



</style>
