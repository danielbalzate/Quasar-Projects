<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- <q-editor
      v-if="modoEdicion"
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Actualizar descripción',
          icon: 'save',
          label: 'Actualizar',
          handler: updateWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />

    <q-editor
      v-else
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Guardar descripción',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    /> -->

    <q-card
      class="row"
      flat
      bordered
      v-for="(item, index) in plants"
      :key="index"
    >
      <q-card-section
        class="col"
        v-html="item.text"
        :class="item.status ? 'tachar' : ''"
      />
      <!-- <q-btn flat color="blue" @click="item.status = !item.status"
        >Acción</q-btn
      > -->
      <q-btn flat color="yellow" @click="editPlant(index, item.id)"
        >Editar</q-btn
      >
      <q-btn flat color="red" @click="deletePlant(index, item.id)"
        >Eliminar</q-btn
      >
    </q-card>
    <div class="flex flex-center" v-if="plants.length == 0">
      <h6>Sin notas</h6>
    </div>
  </div>
</template>
<script>
import { db } from "boot/firebase";
export default {
  data() {
    return {
      editor: "",
      plants: [
        /*  {
          id: "asdasd",
          text: "asdasd",
          status: false
        } */
      ],
      index: null,
      modoEdicion: false,
      id: null
    };
  },
  created() {
    this.listPlants();
  },
  methods: {
    async updateWork() {
      try {
        const resDB = await db
          .collection("plants")
          .doc(this.id)
          .update({
            text: this.editor
          });
        this.plants[this.index].text = this.editor;
        this.$q.notify({
          message: "Se ha actualizado correctamente",
          color: "green-4",
          textColor: "white",
          icon: "check"
        });
      } catch (error) {
        console.log("TCL: updateWork -> error", error);
      } finally {
        this.modoEdicion = false;
        this.index = null;
        this.id = null;
        this.editor = "";
      }
    },
    editPlant(index, id) {
      this.modoEdicion = true;
      this.index = index;
      this.id = id;
      this.editor = this.plants[index].text;
    },
    async listPlants() {
      try {
        const redDB = await db.collection("plants").get();
        redDB.forEach(res => {
          const plant = {
            id: res.id,
            text: res.data().text,
            status: res.data().status
          };
          this.plants.push(plant);
        });
      } catch (error) {
        console.log("TCL: listPlants -> error", error);
      }
    },
    async saveWork() {
      try {
        const resDB = await db.collection("plants").add({
          text: this.editor,
          status: false
        });
        this.plants.push({
          id: resDB.id,
          text: this.editor,
          status: false
        });
        this.editor = "";
        this.$q.notify({
          message: "Se ha guardado correctamente",
          color: "green-4",
          textColor: "white",
          icon: "cloud_done"
        });
      } catch (error) {
        console.log("TCL: saveWork -> error", error);
      }
    },
    uploadIt() {
      this.$q.notify({
        message: "Server unavailable. Check connectivity.",
        color: "red-5",
        textColor: "white",
        icon: "warning"
      });
    },
    deletePlant(index, id) {
      this.$q
        .dialog({
          title: "Acción peligrosa",
          message: "¿Realmente quieres eliminar la planta?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          try {
            await db
              .collection("plants")
              .doc(id)
              .delete();
          } catch (error) {
            console.log("TCL: deletePlant -> error", error);
          }
          this.plants.splice(index, 1);
          this.$q.notify({
            message: "Se ha eliminado correctamente",
            color: "red-4",
            textColor: "white",
            icon: "info"
          });
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
