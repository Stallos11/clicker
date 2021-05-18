<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="tab-content h100">
        <login></login>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import Login from "../components/Login.vue";
import { store } from "../store";

export default {
  name: "FormLogin",
  beforeRouteEnter() {
    store.state.pageName = "Login";
  },
  components: { IonContent, IonPage, Login },
};
</script>
