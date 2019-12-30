<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title="Título del evento"
        icon="settings"
        :done="step > 1"
        :error="!isValid"
      >
        <div class="q-pa-md" style="max-width:50%">
          <q-input
            ref="input"
            filled
            v-model="modelTitle"
            label="Ingrese un título de máximo 50 caracteres."
            bottom-slots
            hint="Máximo 50 caracteres"
            error-message="Trate de ser muy específico al momento ingresar un título."
            :error="!isValid"
            ><template v-slot:prepend> <q-icon name="title" /> </template
          ></q-input>
        </div>
      </q-step>

      <q-step :name="2" title="Fecha del evento" icon="event" :done="step > 2">
        <div class="q-pa-md row" style="max-width:100%">
          <q-date
            class="col-5"
            v-model="modelDate"
            mask="YYYY-MM-DD HH:mm"
            landscape
          />
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Últimas configuraciones"
        icon="verified_user"
        :done="step > 3"
        :error="!isValidTextarea"
      >
        <div class="q-pa-md row " style="max-width:50%">
          <q-input
            v-model="modelTextarea"
            class="q-pb-xl col-12"
            filled
            hint="Trate de ser amplio al momento registrar la descripción."
            type="textarea"
            :error="!isValidTextarea"
            error-message="Máximo 300 caracteres"
            label="Descripción del evento"
          />
          <q-select
            class="q-pb-md q-pr-md col-6"
            color="primary"
            filled
            v-model="modelPosition"
            :options="optionsPosition"
            label="Posición del evento"
          >
            <template v-slot:prepend>
              <q-icon name="dashboard" />
            </template>
          </q-select>
          <q-select
            class="q-pb-md col-6"
            color="primary"
            filled
            v-model="modelColor"
            :options="optionsColor"
            label="Color del evento"
          >
            <template v-slot:prepend>
              <q-icon name="color_lens" />
            </template>
          </q-select>
          <q-input
            ref="input"
            filled
            class="col-9 q-pt-md"
            v-model="modelIcon"
            label="Ingresa el ícono que prefieras"
            bottom-slots
            v-show="modalVisible"
            hint="Máximo 20 caracteres"
            error-message="El ícono debe exitir en https://material.io/resources/icons/"
            :error="!isValidIcon"
            ><template v-slot:prepend>
              <q-icon name="insert_emoticon" /> </template
          ></q-input>
          <q-toggle
            v-model="modalVisible"
            class="q-mb-md col-3"
            :label="modalVisible ? 'Eliminar ícono' : 'Agregar ícono'"
          />
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step != 3"
            @click="$refs.stepper.next()"
            color="primary"
            flat
            :label="step === 2 ? 'Continuar' : 'Continuar'"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Regresar"
            class="q-ml-sm"
          />
          <q-btn
            v-if="step === 3"
            @click="saveEvent"
            color="primary"
            label="Finalizar"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script>
import { db } from "boot/firebase.js";
import { date } from "quasar";
export default {
  data() {
    return {
      step: 1,
      modelTitle: "",
      modelTextarea: "",
      modelIcon: "",
      modelPosition: "left",
      modelColor: "green",
      modelDate: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm"),
      optionsPosition: ["left", "right"],
      optionsColor: [
        "green",
        "red",
        "purple",
        "deep-purple",
        "cyan",
        "lime",
        "light-green",
        "pink",
        "orange",
        "deep-orange",
        "blue",
        "yellow",
        "indigo"
      ],
      id: null,
      modalVisible: false
    };
  },
  computed: {
    isValid() {
      if (this.modelTitle.length != "" && this.modelTitle.length <= 50) {
        return this.modelTitle.length <= 50;
      }
    },
    isValidTextarea() {
      if (this.modelTextarea.length != "" && this.modelTextarea.length <= 300) {
        return this.modelTextarea.length <= 300;
      }
    },
    isValidIcon() {
      if (this.modelIcon.length != "" && this.modelIcon.length <= 300) {
        return this.modelIcon.length <= 300;
      }
    }
  },
  methods: {
    async saveEvent() {
      try {
        if (this.modalVisible === true) {
          const resDB = await db.collection("events").add({
            title: this.modelTitle,
            date: this.modelDate,
            content: this.modelTextarea,
            color: this.modelColor,
            position: this.modelPosition,
            icon: this.modelIcon
          });
        } else {
          const resDB = await db.collection("events").add({
            title: this.modelTitle,
            date: this.modelDate,
            content: this.modelTextarea,
            color: this.modelColor,
            position: this.modelPosition
          });
        }
        this.modelTitle = "";
        this.modelTextarea = "";
        let timeStamp = Date.now();
        let formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm");
        this.modelDate = formattedString;
        this.$q.notify({
          message: "Agregaste un evento correctamente.",
          color: "green",
          textColor: "white",
          icon: "cloud_done"
        });
        this.$router.push("/#");
      } catch (error) {
        console.log("TCL: saveEvent -> error", error);
        this.$q.notify({
          message: "Ha ocurrido un error al agregar un nuevo evento. ",
          color: "red",
          textColor: "white",
          icon: "error"
        });
      }
    }
  }
};
</script>
