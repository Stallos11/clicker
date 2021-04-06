<template>
  <ion-app>
    <ion-header>
      <ion-toolbar class="my-toolbar txt-white">
        <ion-title>{{ title }}</ion-title>
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
  data() {
    return {
      title: "Header"
    }
  },
  components: {
    IonApp,
    IonRouterOutlet,
    IonTitle,
    IonToolbar,
    IonHeader
  },
  mounted() {
    console.log("token=> " + store.state.token);
  }
});
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');
  * {
    font-family: 'Quicksand', sans-serif;
    --color-selected: #FE7B00;
  }

  ion-content{
    --ion-background-color: #f7f7f7;
  }

  @import "../node_modules/axentix/dist/css/axentix.min.css";
 
 .form-material .form-field:not(.form-default) {
    --form-material-color: #FE7B00 !important;
  }

 .my-toolbar{
    --background: #FE7B00;
  }
</style>