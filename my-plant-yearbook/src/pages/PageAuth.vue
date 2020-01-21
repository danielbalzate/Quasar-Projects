<template>
  <q-page class="flex q-pa-xl">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="Ingresar" label="Ingresar" />
        <q-tab name="¡Registrate!" label="¡Registrate!" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Ingresar">
          <login-register :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="¡Registrate!">
          <login-register :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      tab: "Ingresar"
    };
  },
  components: {
    "login-register": require("components/LoginRegister.vue").default
  }
};
</script>
<style></style>
