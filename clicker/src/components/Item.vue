<template>
  <div id="container">
    <p>This component has as properties : </p>
    <ul>
      <li>name : {{ name }}</li>
      <li>earning : {{ earning }}</li>
      <li>buildsCount : {{ buildsCount }}</li>
      <li>basePrice : {{ basePrice }}</li>
      <li>priceMultiplicator : {{ priceMultiplicator }}</li>
      <li>actualPrice : {{ actualPrice }}</li>
      <li>obtentionLevel : {{ obtentionLevel }}</li>
      <li>EPS : {{ EPS }}</li>
    </ul>
  </div>
</template>

<script lang="ts">

export default {
  name: 'ExploreContainer',
  props: {
    name: String,
    earning: Number,
    buildsCount: Number,
    basePrice: Number,
    priceMultiplicator: Number,
    actualPrice: Number,
    obtentionLevel: Number,
    EPS: Number
  },
  methods: {
    buy(){
      console.log("buy");
    },
    setEPS(){
      console.log("setting the global EPS");
    }
  }
}
</script>

