import firebase from "firebase";

export default {
  namespaced: true,
  state: {
    Productos: [],
    add: false
  },
  getters: {
    datos(state) {
      return state.Productos;
    },
  },
  mutations: {
    setData(state, payload) {
      state.Productos.push(payload);
    },
    AddData(state, payload) {
      state.Productos.push(payload);
      

      
    },
    MostrarAdd(state) {
      state.add = !state.add;
    },
  //   deleteData(state,payload) {
  //    let elementoAEliminar = state.Productos.find(x => x.id == payload)
  //    let indexOfElement = state.Productos.indexOf(elementoAEliminar)
  //    state.Productos.splice(indexOfElement,1)
  
  //  },
   
  },
  actions: {
    async getData({ commit }) {
      const db = await firebase
        .firestore()
        .collection("productos")
        .get();
      db.forEach((el) => {
        const producto = {
          id: el.id,
          nombre: el.data().nombre,
          codigo: el.data().codigo,
          stock: el.data().stock,
          precio: el.data().precio,
        };
        commit("setData", producto);
      });
    },
    async addData({ commit }, payload) {
      // Payload es el objeto juguete
      const precio = Number(payload.precio);
      const stock = Number(payload.stock);
      const nombre = payload.nombre.toLowerCase();
      const codigo = payload.codigo.toUpperCase();

      const juguete = {
        precio,
        stock,
        nombre,
        codigo,
      };

      // Agregar a Firestore
      try {
        await firebase
          .firestore()
          .collection("productos")
          .add(juguete);
      } catch (error) {
        console.log("Hay un error en la carga del juguete:", error);
      }
      

      // Agregar a Store
      commit("AddData", juguete);
      
    },

    async borrarJuguete({ commit },id) {
      console.log("borrarJuguete", id);
      try {
        await firebase
        .firestore()
        .collection("productos")
        .doc(id)
        .delete();
      }
      catch(error){
        console.log("Hay un error en la eliminacion del juguete:", error);
      }
      }

        // commit("deleteData", id);
    }
    
  
};
