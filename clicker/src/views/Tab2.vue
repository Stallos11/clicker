<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="page" class="tab-content h100 d-flex vcenter relative-pos">
        <div class="bg-container h100 w100 absolute-pos z-index-1"></div>
        <img
          id="buildIMG"
          @click="earnMoney"
          class="build-img d-flex responsive-media z-index-1 mx-auto mx-4 p-4"
          :src="'assets/img/' + 'bank' + '.png'"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { store } from "../store";
import { Plugins } from "@capacitor/core";
import nFormatter from "../shared/moneyFormatter";
import { Axentix } from "axentix";
import axios from "axios";
import { FCM } from '@capacitor-community/fcm';

const { PushNotifications } = Plugins;

export default {
  name: "Tab2",
  data() {
    return {
      fcm: new FCM()
    }
  },
  components: { IonContent, IonPage },
  mounted() {
    store.dispatch("setEPS");
    store.state.pageName = "Game";
    this.showToast();
    this.sendFCMToken();
  },
  computed: {
    moneyFromClick() {
      return store.state.actualMoney / 1000 > 1 ? Math.round(store.state.actualMoney / 1000) : 1;
    },
  },
  methods: {
    earnMoney() {
      store.state.actualMoney += this.moneyFromClick;
      this.showPop();
    },
    showPop() {
      const el = document.createElement("div");
      const money = nFormatter.format(this.moneyFromClick, 3).toString();
      const img = document.querySelector("#buildIMG");
      const imgTop = img.getBoundingClientRect().top;
      const pageWidth = document.querySelector("#page").getBoundingClientRect().width;

      el.className = "money-pop p-2 txt-white font-s5 absolute-pos";
      el.innerText = `+ ${money} $`;

      document.querySelector("#page").appendChild(el);

      el.style.top = imgTop - 50 + "px";
      el.style.left = Math.round(pageWidth / 2) + "px";
      el.classList.add("active");
      img.classList.add("popping");

      setTimeout(() => {
        el.style.top = imgTop - 100 + "px";
        el.classList.remove("active");
      }, 10);

      setTimeout(() => {
        img.classList.remove("popping");
      }, 100);

      setTimeout(() => {
        el.remove();
      }, 750);
    },
    showToast() {
      if (!store.state.timeDiff) {
        return;
      }
      store.state.actualMoney += store.state.timeDiff * store.state.actualEPS * 0.1;
      const toast = new Axentix.Toast("<p class='w100 m-0'>Earnings during your inactivity : <br /> <span class='font-s3 font-w600'>" + nFormatter.format(Math.round(store.state.timeDiff * store.state.actualEPS * 0.1), 2) + " $</span> </p>", {
        classes: "orange dark-1 txt-center txt-grey txt-light-4 p-2 rounded-2 shadow-1",
        animationDuration: 400,
        duration: 3000,
        position: 'right',
        direction: 'top',
        mobileDirection: 'bottom',
        offset: {
          x: '5%',
          y: '0%',
          mobileX: '10%',
          mobileY: '12%'
        }
      });

      toast.show();
      store.state.timeDiff = 0;
    },
    sendFCMToken() {
      
      PushNotifications.requestPermission().then(result => {
          console.log("result " + JSON.stringify(result));
      });
      // Add registration error if there are.
      PushNotifications.addListener("registrationError", (error) => {
        console.log(`error on register ${JSON.stringify(error)}`);
      }),
      // Add Notification received
      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification) => {
          console.log(`notification ${JSON.stringify(notification)}`);
        }
      ),
      // Add Action performed
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        async (notification) => {
            alert("notification " + notification)
          console.log("notification succeeded");
        }
      ),
      // Initialize the registration with FCM Token
      PushNotifications.register();
      
      this.fcm.getToken().then((res: any) => {
        this.sendToken(res["token"]);
      });
    },
    sendToken(token: string) {
      axios
      .put(
        "https://projet.vincent-dimarco.fr/api/updateUser",
        {
          id: store.state.userID,
          rememberToken: token
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.state.token,
          },
        }
      )
      .then((res) => {
        console.log("FCM token sent", res)
      })
      .catch((err) => {
        console.error("can't send fcm token", err)
      });
    }
  },
};
</script>

<style lang="scss">
.money-pop {
  white-space: nowrap;
  opacity: 0;
  transition-property: opacity, top;
  transition-duration: 750ms;
  transition-timing-function: ease;
  z-index: 50;
  transform: translateX(-50%);

  &.active {
    opacity: 1;
  }
}

.toast {
  margin-bottom: 69px !important;
}

.bg-container {
  top: 0;
  background-image: url("../../public/assets/img/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  // filter: hue-rotate(50deg);
  transform: scale(1);
  animation: blink infinite 20s;
}

#page {
  overflow: hidden;
}

@keyframes blink {
  from {
    transform: scale(1);
  }

  50% {
    transform: scale(1.4);
  }

  to {
    transform: scale(1);
  }
}

#buildIMG {
  transform: scale(1);
  transition: transform 100ms ease;
  filter: hue-rotate(140deg);

  &.popping {
    transform: scale(0.95);
  }
}
</style>
