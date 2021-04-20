<template>
  <div id="container">
    <div class="p-3 airforce dark-3 my-3 mx-3 rounded-2 light-shadow-2 d-flex fx-col relative-pos overflow-hidden">
      <img class="build-img absolute-pos z-index-1" :src="'assets/img/' + name.toLowerCase() + '.png'">
      <div class="d-flex">
        <div>
          <div class="relative-pos z-index-2">
            {{ name }}
            <em class="txt-right font-s1 pr-1 pt-1 relative-pos z-index-2">x{{ buildsCount }}</em>
          </div>
          <em class="font-s1 mt-2 d-block relative-pos z-index-2">
            Earn/sec : {{ EPS }}
          </em>
        </div>
        <div class="ml-auto">
          <button :disabled="actualMoney <= actualPrice" @click="buy" class="btn small white rounded-1 shadow-1 my-auto">buy</button>
        </div>
      </div>
      <em class="font-s1 mt-2 d-block txt-center">
          Price : {{ actualPrice }}$
      </em>
    </div>
  </div>
</template>

<script lang="ts">
import { store } from "../store";

export default {
  name: 'Item',
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
.build-img {
  height: 65%;
  left: -5%;
  bottom: -10%;
  opacity: 0.7;
}
</style>