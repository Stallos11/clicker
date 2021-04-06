<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="tab-content">
        <p class="font-s6 txt-airforce txt-dark-4 font-w600 bd-orange bd-b-solid bd-l-solid bd-dark-1 ml-5 pb-2 pl-3 mr-5">Rank List</p>
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