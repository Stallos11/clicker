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
import { IonPage, IonContent } from '@ionic/vue';
import Register from '../components/Register.vue';


export default  {
  name: 'FormRegister',
  data(){
    return {
      
    }
  },
  components: { IonContent, IonPage, Register},

}
</script>