import Vue from "vue";
import { firebaseAuth, firebaseDB, firebaseFirestore } from "boot/firebase";
import { Notify } from "quasar";
const state = {
  userDetails: {},
  users: {}
};

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload;
    console.count(JSON.stringify(payload));
    console.log("Estoy acá en SetUser");
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails);
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails);
  }
};

const actions = {
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        let userId = firebaseAuth.currentUser.uid;
        firebaseFirestore
          .collection("users")
          .doc(userId)
          .set({
            name: payload.name,
            email: payload.email,
            online: true
          })
          .then(response => {
            Notify.create({
              position: "top",
              message: "Usuario registrado correctamente",
              color: "green",
              icon: "error_outline"
            });
          })
          .catch(response => {
            console.log("Error registrando usuario");
          });
      })
      .catch(error => {
        console.log(error.code, error.message);
        let message = "";
        switch (error.code) {
          case "auth/invalid-email":
            message = "Verifica tu correo electrónico";
            break;
          case "auth/weak-password":
            message = "La contraseña debe contener mínimo 6 carácteres";
            break;
          default:
            message = "Correo electrónico o contraseña inválido";
            break;
        }
        Notify.create({
          position: "top",
          message: message,
          color: "warning",
          icon: "error_outline"
        });
      });
  },
  loginUser({}, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response);
        Notify.create({
          position: "top",
          message: "Acceso correcto",
          color: "green-4",
          icon: "offline_bolt"
        });
      })
      .catch(error => {
        console.log("Error al ingresar", error.message);
        Notify.create({
          position: "top",
          message: "Por favor verifica tu correo electrónico o tu contraseña",
          color: "warning",
          icon: "error_outline"
        });
      });
  },
  logoutUser({ commit, dispatch }) {
    firebaseAuth.signOut();
    dispatch("firebaseUpdateUser", {
      userId: state.userDetails.userId,
      updates: {
        online: false
      }
    });
    commit("setUserDetails", {});
  },
  handleAuthStateChanged({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        console.log("Pasa por handleAuth");

        let userId = firebaseAuth.currentUser.uid;
        firebaseFirestore
          .collection("users")
          .doc(userId)
          .onSnapshot(snapshot => {
            let userDetails = snapshot.data();
            commit("setUserDetails", {
              name: userDetails.name,
              email: userDetails.email,
              userId: userId
            });
          });
        dispatch("firebaseUpdateUser", {
          userId: userId,
          updates: {
            online: true
          }
        });
        dispatch("firebaseGetUsers");
        this.$router.push("/users");
      } else {
        if (this.$router.currentRoute.fullPath !== "/#") {
          this.$router.push("/#");
        }
      }
    });
  },
  firebaseUpdateUser({}, payload) {
    try {
      console.log("Estoy por aca update User");

      firebaseFirestore
        .collection("users")
        .doc(payload.userId)
        .update(payload.updates);
    } catch (error) {
      console.log("Error Actualizando usuarios", error);
    }
  },
  firebaseGetUsers({ commit }) {
    firebaseDB.ref("users").on("child_added", snapshot => {
      let userDetails = snapshot.val();
      let userId = snapshot.key;
      commit("addUser", {
        userId,
        userDetails
      });
    });
    firebaseDB.ref("users").on("child_changed", snapshot => {
      let userDetails = snapshot.val();
      let userId = snapshot.key;
      commit("updateUser", {
        userId,
        userDetails
      });
    });
  }
  /* firebaseGetUsers({ commit }) {
    firebaseFirestore.collection("users").onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        console.log("TCL: firebaseGetUsers -> userDetails", snapshot.data());
        if (change.type === "added") {
          let userDetails = snapshot.data();
          let userId = snapshot.key;
          commit("addUser", {
            userId,
            userDetails
          });
        }
        if (change.type === "changed") {
          let userDetails = snapshot.val();
          let userId = snapshot.key;
          commit("updateUser", {
            userId,
            userDetails
          });
        }
      });
    });
  } */
};

const getters = {
  users: state => {
    let usersFiltered = {};
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFiltered[key] = state.users[key];
      }
    });
    console.log("TCL: usersFiltered", usersFiltered);
    return usersFiltered;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
