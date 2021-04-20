<template>
  <div id="container">
    <!-- <p>This component has as properties : </p>
    <ul>
      <li>name : {{ name }}</li>
      <li>earning : {{ earning }}</li>
      <li>buildsCount : {{ buildsCount }}</li>
      <li>basePrice : {{ basePrice }}</li>
      <li>priceMultiplicator : {{ priceMultiplicator }}</li>
      <li>obtentionLevel : {{ obtentionLevel }}</li>
      <li>actualPrice : {{ actualPrice }}</li>
      <li>EPS : {{ EPS }}</li>
    </ul> -->
    <div class="p-3 airforce dark-3 mb-3 mx-3 rounded-2 light-shadow-2 d-flex">
      <div>
        <div>
          {{ name }}
          <em class="txt-right font-s1 pr-1 pt-1">x{{ buildsCount }}</em>
        </div>
        <em class="font-s1 mt-2 d-block">
          Gains/sec : {{ EPS }}
        </em>
      </div>
      <div class="ml-auto d-flex fx-col">
        <button @click="buy" class="btn small white rounded-1 shadow-1 my-auto">buy</button>
        <em class="font-s1 mt-2 d-block">
          Price : {{ actualPrice }}
        </em>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Item',
  props: {
    nameProp: String,
    earningProp: Number,
    buildsCountProp: Number,
    basePriceProp: Number,
    obtentionLevelProp: Number
  },
  data() {
    return  {
      name: this.nameProp,
      earning: this.earningProp,
      buildsCount: this.buildsCountProp,
      basePrice: this.basePriceProp,
      obtentionLevel: this.obtentionLevelProp,
      pricePercentUpper: 15,
    }
  },
  computed: {
    actualPrice() {
      return Math.round((this.basePrice + this.basePrice * this.pricePercentUpper/100) * this.buildsCount ) || this.basePrice;
    },
    EPS() {
      return this.earning * this.buildsCount;
    },
  },
  methods: {
    buy(){
      console.log("buy");
      this.buildsCount++;
    },
    setEPS(){
      console.log("setting the global EPS");
    }
  },
  mounted() {
    console.log(this.basePrice,  this.buildsCount, this.priceMultiplicator,  this.basePrice * this.buildsCount * this.priceMultiplicator)
  }
}
</script>

