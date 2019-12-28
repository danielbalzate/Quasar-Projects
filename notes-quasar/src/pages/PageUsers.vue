<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator="">
      <q-item
        v-for="(user, key) in users"
        :key="key"
        to="/notes"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white">
            {{ user.name }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label> {{ user.name }} </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online ? "En línea" : "Desconectado" }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  /* data() {
    return {
      users: [
        {
          id: 1,
          name: "Daniel",
          online: true
        },
        {
          id: 2,
          name: "Felicia",
          online: false
        }
      ]
    };
  }, */
  computed: {
    ...mapGetters("store", ["users"])
  }
};
</script>
<style></style>
