<template>
  <!-- <q-form @submit.prevent="submitForm"> -->
  <q-form>
    <q-input
      v-if="tab == '¡Registrate!'"
      class="q-mb-md"
      outlined
      v-model="formData.name"
      label="Nombre"
    ></q-input>
    <q-input
      class="q-mb-md"
      outlined
      v-model="formData.email"
      type="email"
      label="Correo electrónico"
    ></q-input>
    <q-input
      class="q-mb-md"
      outlined
      v-model="formData.password"
      type="password"
      label="Contraseña"
    ></q-input>
    <div class="row">
      <q-space />
      <q-btn
        type="submit"
        color="primary"
        :label="tab"
        @click="submitForm()"
      ></q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("store", ["registerUser", "loginUser"]),
    submitForm() {
      if (this.tab == "Ingresar") {
        this.loginUser(this.formData);
      } else {
        this.registerUser(this.formData);
      }
    }
  }
};
</script>
