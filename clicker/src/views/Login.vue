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
import { IonPage, IonContent } from "@ionic/vue";
import Login from "../components/Login.vue";
import axios from "axios";
import { Storage } from "@ionic/storage";
import { store } from "@/store";

export default {
  name: "FormLogin",
  methods: {
    updateUserData(data, storage) {
      axios
        .put(
          "https://projet.vincent-dimarco.fr/api/updateUser",
          {
            id: data["id"],
            actualMoney: data["actualMoney"],
            buildings: JSON.stringify(data["buildings"]),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + data["token"],
            },
          }
        )
        .then((response) => {
          console.log(response);
          storage.clear();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  mounted() {
    const storage = new Storage();
    storage.create();

    storage.get("user").then((res) => {
      const data = JSON.parse(res);
      data ? this.updateUserData(data, storage) : "";
    });
  },
  beforeRouteEnter() {
    store.state.pageName = "Login";
  },
  components: { IonContent, IonPage, Login },
};
</script>
