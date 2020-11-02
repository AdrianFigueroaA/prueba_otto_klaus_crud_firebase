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
        <tr v-for="item in Productos" :key="item.nombre">
          <td>{{ item.nombre }}</td>
          <td>{{ item.codigo }}</td>
          <td>{{ item.stock }}</td>
          <td>{{ item.precio }}</td>

          <td>
            <v-btn
              
              fab
              small
              color="error"
              @click="borrar(item.id)"
            >
              <v-icon dark>
                mdi-minus
              </v-icon>
            </v-btn>
          </td>

          <td>
            <v-row >
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn fab small color="cyan" v-bind="attrs" v-on="on">
                    <v-icon dark>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Editor de Productos</span>
                  </v-card-title>
                  <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Nombre Producto*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  
                  v-model="juguetes.data.codigo" label="Codigo"
                  
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Precio"
        
              
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Stock"
                 
                  required
                ></v-text-field>
              </v-col>
              
              
            </v-row>
          </v-container>
          <small>*cualquier cambio realizado en este formulario modifica la base de datos</small>
        </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Enviar
          </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </td>
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
      dialog: false,
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

    // EditarJuguete(){
    //   this.editToy();
    // },
        
  },
};
</script>

<style></style>
