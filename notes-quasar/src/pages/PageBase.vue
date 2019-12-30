<template>
  <q-page class="flex">
    <template>
      <div class="q-px-lg q-pb-md " style="width:100%">
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
            class="row "
            bordered
            v-for="(item, index) in events"
            :key="index"
            :title="item.title"
            :subtitle="item.date"
            :side="item.position"
            :icon="item.icon"
            :color="item.color"
          >
            <div>
              {{ item.content }}
              <q-btn
                flat
                round
                color="red"
                icon="cancel"
                @click="deleteEvent(index, item.id)"
              ></q-btn>
            </div>
          </q-timeline-entry>

          <q-timeline-entry heading
            >Me encuentro de vacaciones</q-timeline-entry
          >
        </q-timeline>
      </div>
    </template>
  </q-page>
</template>
<script>
import { db } from "boot/firebase";
import { date } from "quasar";
export default {
  data() {
    return {
      title: "Notas Globales",
      subtitle: "[Quasar & Firebase]",
      index: null,
      events: [],
      id: null
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
  },
  created() {
    this.listEvents();
  },
  methods: {
    async listEvents() {
      try {
        const resDB = await db
          .collection("events")
          .orderBy("date", "asc")
          .get();

        resDB.forEach(res => {
          const event = {
            id: res.id,
            title: res.data().title,
            date: res.data().date,
            position: res.data().position,
            content: res.data().content,
            color: res.data().color,
            icon: res.data().icon
          };
          this.events.push(event);
        });
      } catch (error) {
        console.log("TCL: listEvents -> error", error);
      }
    },
    deleteEvent(index, id) {
      this.$q
        .dialog({
          title: "¡Cuidado!",
          message: "¿Desea eliminar el evento?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          try {
            await db
              .collection("events")
              .doc(id)
              .delete();
            this.events.splice(index, 1);
            this.$q.notify({
              message: "Evento eliminada correctamente!",
              color: "lime-6",
              textColor: "white",
              icon: "delete_sweep"
            });
          } catch (error) {
            console.log("error");
            this.$q.notify({
              message: "¡Ha ocurrido un error eliminando el evento!",
              color: "red-6",
              textColor: "white",
              icon: "delete_sweep"
            });
          }
        });
    }
  }
};
</script>
<style></style>
