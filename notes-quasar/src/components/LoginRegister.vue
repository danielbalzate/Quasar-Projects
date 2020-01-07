<template>
  <q-form @submit.prevent="submitForm">
    <q-input
      v-if="tab == '¡Registrate!'"
      class="q-mb-md"
      outlined
      filled
      hint="Ingresa tu nombre o apodo"
      v-model="formData.name"
      label="Nombre"
      :rules="[
        val =>
          (val.length != 0 && val.length <= 20) ||
          'Tu usuario no debe superar los 20 caracteres'
      ]"
    >
      <template v-slot:append>
        <q-icon name="perm_identity" />
      </template>
    </q-input>
    <q-input
      filled
      class="q-mb-md"
      outlined
      v-model="formData.email"
      type="email"
      hint="Ingresa tu correo electrónico."
      label="Correo electrónico"
      ><template v-slot:append>
        <q-icon name="mail" />
      </template>
    </q-input>
    <q-input
      class="q-mb-md"
      outlined
      v-model="formData.password"
      filled
      :type="isPwd ? 'password' : 'text'"
      hint="Ingresa tu contraseña."
      label="Contraseña"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        /> </template
    ></q-input>
    <div class="row justify-center">
      <q-btn type="submit" color="primary" :label="tab"></q-btn>
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
      },
      isPwd: true
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
