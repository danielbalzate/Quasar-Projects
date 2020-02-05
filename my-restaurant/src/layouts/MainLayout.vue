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
        <q-btn
          v-if="$router.history.current.fullPath.includes('/profile')"
          v-go-back.single
          color="primary"
          icon="arrow_back"
          label="Regresar"
        />
        <q-btn
          to="/auth"
          color="primary"
          icon="account_circle"
          push
          class="absolute-right q-pr-sm"
        />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">Menú principal</q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },
  computed: {
    title() {
      let currentPath = this.$router.history.current.fullPath;
      /* console.log(
        "TCL: title -> this.$router.history.current.fullPath",
        this.$router.history.current.fullPath
      ); */
      if (currentPath == "/") return "My Restaurant";
      else if (currentPath == "/users") return "Usuarios";
      else if (currentPath == "/auth") return "Autentificación";
      else if (currentPath == "/profile") return "Perfil de usuario";
    }
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Autentificacion",
          caption: "Registro y logueo de usuarios",
          icon: "school",
          to: "/auth"
        },
        {
          title: "Github",
          caption: "Daniel B. Alzate",
          icon: "whatshot",
          link: "https://github.com/danielbalzate"
        }
      ]
    };
  }
};
</script>
