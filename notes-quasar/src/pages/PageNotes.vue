<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- Editor -->
    <q-editor
      v-if="!modeEdition"
      v-model="editor"
      flat
      content-class="bg-lime-1"
      toolbar-text-color="white"
      toolbar-toggle-color="dark 8"
      toolbar-bg="primary"
      :definitions="{
        save: {
          tip: 'Guardar tarea',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['quote', 'unordered', 'ordered'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h3', 'h4', 'h5', 'h6']
          }
        ],
        [('upload', 'save')]
      ]"
    />
    <q-editor
      v-if="editor && modeEdition == true"
      v-model="editor"
      flat
      content-class="bg-dark-3"
      toolbar-text-color="white"
      toolbar-toggle-color="dark 8"
      toolbar-bg="primary"
      :definitions="{
        save: {
          tip: 'Actualizar nota',
          icon: 'save',
          label: 'Actualizar',
          handler: updateWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['quote', 'unordered', 'ordered'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h3', 'h4', 'h5', 'h6']
          }
        ],
        [('upload', 'save')]
      ]"
    />

    <!-- Donde se pinta -->
    <q-card class="row " bordered v-for="(item, index) in tasks" :key="index">
      <q-card-section
        class="col"
        v-html="item.text"
        :class="item.status ? 'tachar' : ''"
        ><br />
      </q-card-section>

      <div class="col-3 self-center">
        <q-btn
          flat
          color="amber"
          icon="layers_clear"
          @click="editTask(index, item.id)"
          >Editar</q-btn
        >
        <q-btn
          flat
          color="red"
          icon="cancel"
          @click="deleteTask(index, item.id)"
          >Eliminar</q-btn
        >
      </div>
      <q-space />
      <q-card-section>
        <q-rating size="24px" v-model="stars" :max="5" />
      </q-card-section>
    </q-card>
    <div v-if="tasks.length == 0" class="flex flex-center">
      <p class="text-h6">Sin notas</p>
    </div>
  </div>
</template>

<script>
import { db } from "boot/firebase.js";
export default {
  data() {
    return {
      editor: "",
      stars: 5,
      tasks: [
        /* ACÁ ESTÁ LOS ARRAYS DE FIREBASE
          {
            id: "chamuchomaso",
            text: "jaja",
            status: false
          } .. */
      ],
      index: null,
      modeEdition: false,
      id: null
    };
  },
  created() {
    this.listTasks();
  },
  methods: {
    async updateWork() {
      try {
        const resDB = await db
          .collection("tasks")
          .doc(this.id)
          .update({
            text: this.editor
          });

        this.tasks[this.index].text = this.editor;

        this.$q.notify({
          message: "¡Tarea actualizada correctamente!",
          color: "dark",
          textColor: "white",
          icon: "cloud_done"
        });
      } catch (error) {
        this.$q.notify({
          message: "Ha ocurrido un error",
          color: "red",
          textColor: "white",
          icon: "clear"
        });
      } finally {
        this.modeEdition = false;
        this.index = null;
        this.id = null;
        this.editor = "";
      }
    },
    editTask(index, id) {
      this.modeEdition = true;
      this.index = index;
      this.id = id;
      this.editor = this.tasks[index].text;
    },
    async listTasks() {
      try {
        const resDB = await db.collection("tasks").get();

        resDB.forEach(res => {
          // console.log(res.id);
          const task = {
            id: res.id,
            text: res.data().text,
            status: res.data().status
          };
          this.tasks.push(task);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async saveWork() {
      try {
        const resDB = await db.collection("tasks").add({
          text: this.editor,
          status: false
        });
        this.tasks.push({
          text: this.editor,
          status: false,
          id: resDB.id
        });
        this.editor = "";
        this.$q.notify({
          message: "Agregaste una nota correctamente",
          color: "green-4",
          textColor: "white",
          icon: "cloud_done"
        });
      } catch (error) {
        console.log(error);
      }
    },
    deleteTask(index, id) {
      this.$q
        .dialog({
          title: "¡Cuidado!",
          message: "¿Desea eliminar la nota?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          try {
            await db
              .collection("tasks")
              .doc(id)
              .delete();
            this.tasks.splice(index, 1);
            this.$q.notify({
              message: "¡Tarea eliminada correctamente!",
              color: "red",
              textColor: "white",
              icon: "delete_sweep"
            });
          } catch (error) {
            console.log("error");
          }
        });
    },
    confirm() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to turn on the wifi?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log('>>>> OK')
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  }
};
</script>
<style>
.tachar {
  text-decoration: line-through;
}
</style>
