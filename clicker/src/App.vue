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
            <span v-if="actualMoney" class="font-s2 font-w600 white rounded-2 light-shadow-1 p-2">{{ shownActualMoney }}$</span>
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
import nFormatter from './shared/moneyFormatter';

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
    shownActualMoney() {
      return nFormatter.format(this.actualMoney, 3)
    }
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
  methods: {
    nFormatter(num: any, digits: any) {
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      const si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "B" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "aa" },
        { value: 1E18, symbol: "bb" },
        { value: 1E21, symbol: "cc" },
        { value: 1E24, symbol: "dd" },
        { value: 1E27, symbol: "ee" },
        { value: 1E30, symbol: "ff" },
      ];
      let i: number;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }
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
