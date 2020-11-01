<template>
  <div class="home">
    <v-container>
      <v-app-bar app color="primary" dark>
        <h1>Inventario Otto Klaus</h1>
        <v-spacer></v-spacer>

        <v-btn class="align-content-end" color="error" @click="logout">
          Salir
        </v-btn>
      </v-app-bar>

      <TablaDatos />
      <v-btn @click="showAdd" depressed>
        <span v-if="!add">Agregar Producto</span>
        <span v-if="add">Cerrar Formulario</span>
      </v-btn>
      <AgregarProductos v-if="add" />
    </v-container>
  </div>
</template>

<script>
import TablaDatos from "@/components/TablaDatos.vue";
import AgregarProductos from "@/components/AgregarProductos.vue";
import { mapMutations, mapState } from "vuex";
import firebase from "firebase";
export default {
  name: "Home",
  components: {
    TablaDatos,
    AgregarProductos,
  },
  computed: {
    ...mapState("Datos", ["add"]),
  },
  methods: {
    ...mapMutations("Datos", ["MostrarAdd"]),
    showAdd() {
      this.MostrarAdd();
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        })
        .catch((e) => {
          console.error("Sign Out Error", e);
        });
    },
  },
};
</script>

<style lang="scss">
.home {
  padding: 20px 0;
}
</style>
