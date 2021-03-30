<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title>General header</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonTitle, IonToolbar, IonHeader} from '@ionic/vue';
import { store } from './store';
import { defineComponent } from 'vue';
//import Axentix from 'axentix';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonTitle,
    IonToolbar,
    IonHeader
  },
  mounted() {
    console.log("jai le store", store)
  }
});
</script>

<style lang="scss" scoped>
  @import "~axentix/dist/css/axentix.min.css";
</style>