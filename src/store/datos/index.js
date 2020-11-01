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
      console.log("payload",state.Productos,payload)
      state.Productos = payload;
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

     getData({ commit }) {
      firebase
        .firestore()
        .collection("productos")
        .onSnapshot((snapshot) => {
          console.log(snapshot);

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
          commit("setData", listadoProductos)
        });

    },
    async addData({ commit }, payload) {
      // Payload es el objeto juguete
      const precio = Number(payload.precio);
      const stock = Number(payload.stock);
      const nombre = payload.nombre.toLowerCase();
      const codigo = payload.codigo.toUpperCase();

      const juguete = {
        precio ,
        stock,
        nombre,
        codigo,
      };

      try {
        await firebase
          .firestore()
          .collection("productos")
          .add(juguete);
      } catch (error) {
        console.log("Hay un error en la carga del juguete:", error);
      }
      
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
        // commit("deleteData",id);
      }
      catch(error){
        console.log("Hay un error en la eliminacion del juguete:", error);
      }
      },

       
    }
    
  
};
