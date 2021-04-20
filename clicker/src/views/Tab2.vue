<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="tab-content">
        <button v-on:click="test()">Test</button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { store } from "../store";

export default {
  name: "Tab2",
  components: { IonContent, IonPage },
  methods: {
    test() {
      console.log(store.state.buildings["b2"]);
    },
  },
};
</script>
