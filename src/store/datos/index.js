import firebase from "firebase";

export default {
  namespaced: true,
  state: {
    Productos: [],
    add: false,
  },
  getters: {
    datos(state) {
      return state.Productos;
    },
  },
  mutations: {
    setData(state, payload) {
      state.Productos = payload;
    },
    AddData(state, payload) {
      state.Productos.push(payload);
    },
    MostrarAdd(state) {
      state.add = !state.add;
    },
  },
  actions: {
    getData({ commit }) {
      firebase
        .firestore()
        .collection("productos")
        .onSnapshot((snapshot) => {
          let listadoProductos = [];
          snapshot.forEach((p) => {
            listadoProductos.push({
              id: p.id,
              nombre: p.data().nombre,
              codigo: p.data().codigo,
              stock: p.data().stock,
              precio: p.data().precio,
            });
          });
          commit("setData", listadoProductos);
        });
    },
    async addData({ commit }, payload) {
      const juguete = {
        precio: Number(payload.precio),
        stock: Number(payload.stock),
        nombre: payload.nombre.toLowerCase(),
        codigo: payload.codigo.toUpperCase(),
      };

      try {
        await firebase
          .firestore()
          .collection("productos")
          .add(juguete);
      } catch (error) {
        console.error("Hay un error en la carga del juguete:", error);
      }
    },

    async borrarJuguete({ commit }, id) {
      try {
        await firebase
          .firestore()
          .collection("productos")
          .doc(id)
          .delete();
        // commit("deleteData",id);
      } catch (error) {
        console.error("Hay un error en la eliminacion del juguete:", error);
      }
    },

    async editToy({ commit }, actualizar) {
      try {
        await firebase
          .firestore()
          .collection("listado")
          .doc(actualizacion.id)
          .update(actualizacion.data);
      } catch (error) {
        console.error("hay un error en la edicion del juguete:", error);
      }
    },
  },
};
