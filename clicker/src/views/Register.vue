<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="tab-content">
        <register></register>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import Register from "../components/Register.vue";
import { store } from "../store";

export default {
  name: "FormRegister",
  data() {
    return {};
  },
  beforeRouteEnter() {
    store.state.pageName = "Register";
  },
  components: { IonContent, IonPage, Register },
};
</script>
