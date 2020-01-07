<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
        <q-btn
          v-if="!userDetails.userId"
          no-caps
          dense
          flat
          to="/auth"
          icon="account_circle"
          class="absolute-right q-pr-sm"
          label="Ingresar"
        >
        </q-btn>
        <q-btn
          v-else
          @click="logoutUser"
          no-caps
          dense
          flat
          to="/auth"
          icon="account_circle"
          class="absolute-right q-pr-sm"
          >Cerrar Sesión<br />
          {{ userDetails.name }}
        </q-btn>

        <!-- <div>Daniel Buitrago</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Menú principal</q-item-label>
        <!-- Botón Base -->
        <q-item clickable to="/#" v-if="!userDetails.userId">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Base</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Botón Perfil de usuario -->
        <q-item v-if="userDetails.userId" clickable to="/userProfile">
          <q-item-section avatar>
            <q-icon name="whatshot" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mi perfil</q-item-label>
          </q-item-section>
        </q-item>
        <!--  Botón Notas Globales-->
        <q-item v-if="userDetails.userId" clickable to="/notes">
          <q-item-section avatar>
            <q-icon name="playlist_add_check" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Notas Globales</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Botón lista de usuarios Globales -->
        <q-item v-if="userDetails.userId" clickable to="/users">
          <q-item-section avatar>
            <q-icon name="face" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Usuarios Globales</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Botón registrar líneas de tiempo -->
        <q-item v-if="!userDetails.userId" clickable to="/timelineRegister">
          <q-item-section avatar>
            <q-icon name="flash_on" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Registrar línea de tiempo</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Botón autentificación -->
        <q-item clickable to="/auth" v-if="!userDetails.userId">
          <q-item-section avatar>
            <q-icon name="directions_run" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Autentificación</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Tercero Botón -->
        <q-item v-if="userDetails.userId" clickable to="/uploadImage">
          <q-item-section avatar>
            <q-icon name="image" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Subir imagen a Firebase</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Quinto Botón -->
        <q-item v-if="userDetails.userId" to="/auth" @click="logoutUser">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cerrar sesión</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    ...mapState("store", ["userDetails"]),
    title() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/#") return "Página principal putos!";
      else if (currentPath == "/notes") return "Bloc de notas";
      else if (currentPath == "/users") return "Usuarios";
      else if (currentPath == "/auth") return "Autentificación";
      else if (currentPath == "/timelineRegister")
        return "Registrar línea de tiempo";
    }
  },
  methods: {
    ...mapActions("store", ["logoutUser"])
  }
};
</script>
<style lang="stylus">
.q-toolbar
  .q-btn
    line-height :1.2
</style>
