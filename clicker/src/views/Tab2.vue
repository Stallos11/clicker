<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="page" class="tab-content h100 d-flex vcenter relative-pos">
        <div class="bg-container h100 w100 absolute-pos z-index-1"></div>
        <img id="buildIMG" @click="earnMoney" class="build-img d-flex responsive-media z-index-1 mx-auto mx-4" :src="'assets/img/' + 'bank' + '.png'">
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { store } from "../store";
import nFormatter from "../shared/moneyFormatter";

export default {
  name: "Tab2",
  components: { IonContent, IonPage },
  mounted() {
    store.dispatch("setEPS");
    store.state.pageName = "Game";
  },
  computed: {
    moneyFromClick() {
      return ( store.state.actualMoney / 1000 ) > 1 ?  Math.round(store.state.actualMoney / 1000 ): 1
    }
  },
  methods: {
    earnMoney() {
      store.state.actualMoney += this.moneyFromClick; 
      this.showPop();
    },
    showPop() {
      const el = document.createElement('div');
      const money = nFormatter.format(this.moneyFromClick, 3).toString();
      const img = document.querySelector('#buildIMG');
      const imgTop = img.getBoundingClientRect().top;
      const pageWidth = document.querySelector('#page').getBoundingClientRect().width;

      el.className = "money-pop p-2 txt-white font-s5 absolute-pos";
      el.innerText = `+ ${money} $`;
      
      document.querySelector('#page').appendChild(el);

      el.style.top = imgTop - 50 + "px";
      el.style.left =  Math.round(pageWidth / 2) + 'px';
      el.classList.add('active');
      img.classList.add('popping');
      
      setTimeout(() => {
        el.style.top = (imgTop - 100) + 'px';
        el.classList.remove('active')
      }, 10);

      setTimeout(() => {
        img.classList.remove('popping');
      }, 100);

      setTimeout(() => {
        el.remove();
      }, 750);
    }
  }
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

.bg-container {
  top: 0;
  background-image: url("../../public/assets/img/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: hue-rotate(50deg);
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
    transform: scale(1.1);
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