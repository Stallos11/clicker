<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="tab-content">
        <item 
          v-for="item in items" :key="item.name"
          :nameProp="item.name"
          :earningProp="item.earning"
          :basePriceProp="item.basePrice"
          :obtentionLevelProp="item.obtentionLevel"
        >
        </item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Item from '../components/Item.vue';
import { store } from "../store";

export default  {
  name: 'Tab3',
  data: () => ({
    items: [
      {
        name: "Tepee",
        earning: 1,
        basePrice: 100,
      },
      {
        name: "Hut",
        earning: 10,
        basePrice: 1_100,
      },
      {
        name: "House",
        earning: 100,
        basePrice: 12_000,
      },
      {
        name: "Villa",
        earning: 1_000,
        basePrice: 130_000,
      },
      {
        name: "Temple",
        earning: 10_000,
        basePrice: 1_400_000,
      }
    ],
  }),
  computed: {
    buildsCountData() {
      return Object.values(store.state.buildings);
    }
  },
  components: { IonContent, IonPage, Item }
}
</script>