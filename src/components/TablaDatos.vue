<template>

  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Nombre
          </th>
          <th class="text-left">
            Código
          </th>
          <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Precio
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in Productos"
          :key="item.nombre"
         
        >
          <td>{{ item.nombre }}</td>
          <td>{{ item.codigo }}</td>
          <td>{{ item.stock }}</td>
          <td>{{ item.precio }}</td>

        
          <v-btn
            class="mx-2"
            fab
            small
            color="error"
            @click="borrar(item.id)"
          >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>

          <v-btn class="mx-2" fab dark small color="cyan">
            <v-icon dark>
              mdi-pencil
            </v-icon>
          </v-btn>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "TablaDatos",
 
  data() {
    return {
      juguetes: {
        data: {
          codigo: "",
          nombre: "",
          stock: "",
          precio: "",
        },
      },
    };
  },
  computed: {
    ...mapState("Datos", ["Productos"]),
  },
  methods: {
...mapActions("Datos", ["borrarJuguete"]),

 borrar(id) {
      this.borrarJuguete(id);
      
    },

  },
};
</script>

<style></style>
