<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="tab-content">
          <p>Rank List</p>
          <rank-list :users="users" pageTitle="lalaalal"></rank-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import RankList from '../components/RankList.vue';

export default  {
  name: 'Tab1',
  data(){
    return {
      users: {}
    }
  },
  components: { IonContent, IonPage, RankList},

}
</script>