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
import { IonPage, IonContent } from '@ionic/vue';
import Login from '../components/Login.vue';
import axios from "axios";

export default  {
  name: 'FormLogin',
  data(){
    return {
      
    }
  },
  methods: {
    updateUserData() {
      axios.put('https://clicker.vincent-dimarco.fr/api/update', {
        id: localStorage.getItem('id'),
        actualMoney: parseInt(localStorage.getItem('actualMoney')),
        buildings: localStorage.getItem('buildings'),
      },
      {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem('token'),
        }
      })
      .then(response => { 
          console.log(response)
      })
      .catch(error => {
          console.log(error.response)
      });
    }
  },
  mounted() {
    console.log("getItem ID", localStorage.getItem('id'));
    console.log("getItem money", localStorage.getItem('actualMoney'));
    
    if (localStorage.getItem('id') != "-1") {
      this.updateUserData();
      localStorage.setItem('id', "-1");
    }
  },
  components: { IonContent, IonPage, Login},
}
</script>