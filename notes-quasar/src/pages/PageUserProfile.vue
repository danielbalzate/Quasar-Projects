<template>
  <q-page class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" />

      <q-card-actions align="around">
        <q-btn push round color="red" icon="favorite" />
        <q-btn push round color="teal" icon="bookmark" />
        <q-btn push round color="primary" icon="share" />
      </q-card-actions>
    </q-card>
    <!--  -->
    <q-card class="my-card bg-secondary text-white">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section>
        {{ lorem }}
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script></script>
<style></style>
