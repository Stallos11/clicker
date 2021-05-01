<template>
  <ion-app>
    <ion-header>
      <ion-toolbar class="my-toolbar txt-white">
        <ion-title>
          {{ pageName }}
        </ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon name="star"></ion-icon>
            <span v-if="actualMoney" class="font-s2 font-w600 white rounded-2 light-shadow-1 p-2">{{ actualMoney }}$</span>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonTitle, IonToolbar, IonHeader, IonButton, IonButtons, IonIcon } from "@ionic/vue";
import { store } from "./store";
import { defineComponent } from "vue";
import { Plugins, AppState } from "@capacitor/core";
import axios from "axios";

const { App } = Plugins;

export default defineComponent({
  name: "App",
  data() {
    return {
      title: "",
    };
  },
  computed: {
    pageName: () => store.state.pageName,
    actualMoney: () => store.state.actualMoney,
  },
  components: {
    IonApp,
    IonRouterOutlet,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonButtons,
    IonButton,
    IonIcon,
  },
  mounted() {
    App.addListener("appStateChange", (state: AppState) => {
      if (store.state.isLogged && !state.isActive) {
        axios
          .put(
            "https://projet.vincent-dimarco.fr/api/updateUser",
            {
              id: store.state.userID,
              actualMoney: store.state.actualMoney,
              buildings: store.state.buildings,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + store.state.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error.response);
          });
      }
    });

    setInterval(() => {
      store.state.actualMoney += store.state.actualEPS;
    }, 1000);
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");
* {
  font-family: "Quicksand", sans-serif;
  --color-selected: #fe7b00;
}

ion-content {
  --ion-background-color: #f7f7f7;
}

@import "../node_modules/axentix/dist/css/axentix.min.css";

.form-material .form-field:not(.form-default) {
  --form-material-color: #fe7b00 !important;
}

.my-toolbar {
  --background: #fe7b00;
}
</style>
