<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="tab-content">
        <item 
          v-for="(item, index) in items" :key="item.name"
          :nameProp="item.name"
          :earningProp="item.earning"
          :buildsCountProp="buildsCountData[index]"
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

export default  {
  name: 'Tab3',
  data: () => ({
    items: [
      {
        name: "Tipi",
        earning: 1,
        obtentionLevel: 1,
        basePrice: 100,
      },
      {
        name: "Cabane",
        earning: 2,
        obtentionLevel: 2,
        basePrice: 1100,
      }
    ],
    buildsCountData: [0, 0]
  }),
  components: { IonContent, IonPage, Item }
}
</script>