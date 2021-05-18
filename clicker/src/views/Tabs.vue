<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button @click="setTitle('Ranking')" tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="list" />
          <ion-label>Ranking</ion-label>
        </ion-tab-button>

        <ion-tab-button @click="setTitle('Game')" tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="gameController" />
          <ion-label>Game</ion-label>
        </ion-tab-button>

        <ion-tab-button @click="setTitle('Buildings')" tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="flash" />
          <ion-label>Builds</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from "@ionic/vue";
import { gameController, flash, list } from "ionicons/icons";
import { store } from "../store";

export default {
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      gameController,
      flash,
      list,
    };
  },
  methods: {
    setTitle(pageName: string) {
      store.state.pageName = pageName;
    },
  },
};
</script>

<style lang="scss">
.tab-content {
  padding-top: 56px;
}
</style>
