<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="tab-content">
        <p @click="earnMoney">Press to become a PGM</p>
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
  mounted() {
    store.dispatch("setEPS");
    store.state.pageName = "Game";
  },
  methods: {
    earnMoney() {
      store.state.actualMoney += ( store.state.actualMoney / 1000 ) > 1 ?  Math.round(store.state.actualMoney / 1000 ): 1; 
    }
  }
};
</script>
