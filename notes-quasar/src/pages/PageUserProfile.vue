<template>
  <q-page class="q-pa-md row items-start q-gutter-md">
    <!--  <q-card class="my-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" />

      <q-card-actions align="around">
        <q-btn push round color="red" icon="favorite" />
        <q-btn push round color="teal" icon="bookmark" />
        <q-btn push round color="primary" icon="share" />
      </q-card-actions>
    </q-card> -->
    <!-- Actualizar foto de perfil -->
    <q-card class="my-card">
      <q-parallax
        src="https://cdn.quasar.dev/img/parallax2.jpg"
        :height="150"
      />
      <q-card-section>
        <div class="text-h6">Tu foto de perfil</div>
      </q-card-section>
    </q-card>
    <div class="col-12">
      <q-uploader
        url="http://localhost:4444/upload"
        label="Actualiza tu foto de perfil"
        square
        accept=".jpg, image/*"
        style="max-width: 300px"
        @click="onPickFile"
      />
    </div>
  </q-page>
</template>
<script></script>
<style></style>
