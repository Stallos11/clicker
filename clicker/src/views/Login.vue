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
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

export default  {
  name: 'FormLogin',
  data(){
    return {
      
    }
  },
  methods: {
    updateUserData() {
      axios.put('https://clicker.vincent-dimarco.fr/api/updateUser', {
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
        console.log(response);
        localStorage.setItem('id', "-1");
      })
      .catch(error => {
          console.log(error.response)
      });
    }
  },
  mounted() {
    // console.log("getItem ID", localStorage.getItem('id'));
    // console.log("getItem money", localStorage.getItem('actualMoney'));
    // console.log(Storage.get(""))

    Storage.get({ key: 'user' }).then((res) => {
      const test = res.value;
      console.log("PGM", JSON.parse(test));
    });
    console.log("PGM 2 : ", window.localStorage.getItem('_cap_user'));

    console.log("PGM 2 : ", JSON.parse(window.localStorage.getItem('_cap_user')));
    
    if (localStorage.getItem('id') != "-1") {
      this.updateUserData();
    }
  },
  components: { IonContent, IonPage, Login},
}
</script>