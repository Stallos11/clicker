<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="tab-content"></div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { store } from "../store";

export default {
  name: "Tab2",
  components: { IonContent, IonPage },
  mounted() {
    store.dispatch("setEPS");
    store.state.pageName = "Game";
  },
};
</script>
