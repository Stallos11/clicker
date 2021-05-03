<template>
  <div id="container">
    <div class="white my-4 mx-3 rounded-2 light-shadow-2 d-flex overflow-hidden">
      <img height="60" width="60" class="build-img my-auto responsive-media ml-2 z-index-1" :src="'assets/img/' + name.toLowerCase() + '.png'">
      <div class="d-flex fx-row w100">
        <div class="d-flex fx-col p-3">
          <div>
            <div class="relative-pos z-index-2">
              {{ name }}
              <em class="txt-right font-s1 pr-1 pt-1 relative-pos z-index-2">x{{ buildsCount }}</em>
            </div>
            <em class="font-s1 mt-2 d-block relative-pos z-index-2">
              Earn/sec : {{ EPS }}
            </em>
          </div>
          <em class="font-s1 mt-2 d-block">
              Price : {{ actualPrice }}$
          </em>
        </div>  
        <button :disabled="actualMoney <= actualPrice" @click="buy" class="btn press h100 txt-white font-w00 font-s5 green dark-2 ml-auto">
          <ion-icon :icon="cashOutline" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { store } from "../store";
import { cashOutline } from "ionicons/icons";

export default {
  name: 'Item',
  setup: () => ({
      cashOutline
  }),
  props: {
    nameProp: String,
    earningProp: Number,
    basePriceProp: Number,
    obtentionLevelProp: Number
  },
  data() {
    return  {
      name: this.nameProp,
      earning: this.earningProp,
      basePrice: this.basePriceProp,
      obtentionLevel: this.obtentionLevelProp,
      priceMultiplicator: 1.15,
    }
  },
  computed: {
    actualPrice() {
      return Math.round(this.basePrice * Math.pow(this.priceMultiplicator, this.buildsCount)) ;
    },
    EPS() {
      return this.earning * this.buildsCount;
    },
    buildsCount() {
      return store.state.buildings[this.name];
    },
    actualMoney() {
      return store.state.actualMoney;
    }
  },
  methods: {
    buy(){
      if (store.state.actualMoney < this.actualPrice) {
        return;
      }

      store.state.actualMoney -= this.actualPrice;
      store.state.buildings[this.name]++;
      this.setEPS();
    },
    setEPS() {
      store.state.actualEPS += this.earning;
    }
  }
}
</script>

<style lang="scss" scoped>
// .build-img {
//   height: 65%;
//   left: -5%;
//   bottom: -10%;
//   opacity: 0.7;
// }
</style>