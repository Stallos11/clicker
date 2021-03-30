<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title>General header</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-router-outlet style="padding-top: 56px;" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { store } from './store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  mounted() {
    console.log("jai le store", store)
  }
});
</script>