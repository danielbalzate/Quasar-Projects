<template>
  <q-page class="flex">
    <template>
      <div class="q-px-lg q-pb-md">
        <q-timeline :layout="layout" color="secondary">
          <q-timeline-entry heading>
            {{ title }}
            <br />
            {{ subtitle }}
            <!-- ({{
              $q.screen.lt.sm
                ? "Dense"
                : $q.screen.lt.md
                ? "Comfortable"
                : "Loose"
            }}
            layout) -->
          </q-timeline-entry>

          <q-timeline-entry
            :title="[firstEventTitle]"
            :subtitle="[firstEventDate]"
            :side="[firstEventPosition]"
            icon="flight_takeoff"
            :color="[firstEventColor]"
          >
            <div>
              {{ firstEventContent }}
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            :title="[secondEventTitle]"
            :subtitle="[secondEventDate]"
            :side="[secondEventPosition]"
            icon="book"
            :color="[secondEventColor]"
          >
            <div>
              {{ secondEventContent }}
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            :title="[thirdEventTitle]"
            :subtitle="[thirdEventDate]"
            :side="[thirdEventPosition]"
            icon="how_to_reg"
            :color="[thirdEventColor]"
          >
            <div>
              {{ thirdEventContent }}
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            :title="[fourthEventTitle]"
            :subtitle="[fourthEventDate]"
            :side="[fourthEventPosition]"
            :color="[fourthEventColor]"
          >
            <div>
              {{ fourthEventContent }}
            </div>
          </q-timeline-entry>
          <q-timeline-entry heading
            >Me encuentro de vacaciones</q-timeline-entry
          >

          <q-timeline-entry
            title="Event Title"
            subtitle="February 22, 1986"
            side="right"
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="Event Title"
            subtitle="February 22, 1986"
            side="left"
            color="orange"
            icon="done_all"
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </template>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      title: "Notas Globales",
      subtitle: "[Quasar & Firebase]",
      firstEventTitle: "Inicio del proyecto",
      firstEventDate: "Diciembre 25, 2019",
      firstEventPosition: "left",
      firstEventContent:
        "El objetivo final de este repositorio es mantener organizado mis proyectos mientras aprendo Quasar App.",
      firstEventColor: "green",
      secondEventTitle: "Se sube la versión estable de Notas con Firebase",
      secondEventDate: "Diciembre 26, 2019",
      secondEventPosition: "right",
      secondEventContent:
        "Este fue el primer CRUD realizado con Quasar & Firebase, es emocionante empezar con lo básico e ir aprendiendo cada vez más y más, hasta llegar al punto de pasar horas frente a la pantalla investigando, como si quisieras saberlo todo en un instante.",
      secondEventColor: "primary",
      thirdEventTitle: "Inicia la autentificación de usuarios",
      thirdEventDate: "Diciembre 27, 2019",
      thirdEventPosition: "left",
      thirdEventContent:
        "Puede ser el inicio de algo grande, y por qué no pensarlo... Un viaje de diez mil kilómetros empieza por un solo paso, a medida que caminas irás encontrando más ideas, más problemas, más vivencias y allí se encuentra el verdadero placer de hacer código por gusto.",
      thirdEventColor: "orange",
      fourthEventTitle: "Finaliza módulo de registro",
      fourthEventDate: "Diciembre 28, 2019",
      fourthEventPosition: "left",
      fourthEventContent:
        "Todo funciona mejor si empiezas a pensar en ti y en los demás, una vez terminado este módulo queda pensar en qué se vendrá luego. Unas vacaciones no vendrían mal.",
      fourthEventColor: "orange"
    };
  },
  computed: {
    layout() {
      return this.$q.screen.lt.sm
        ? "dense"
        : this.$q.screen.lt.md
        ? "comfortable"
        : "loose";
    }
  }
};
</script>
<style></style>
