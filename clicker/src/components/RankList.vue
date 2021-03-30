<template>
  <div id="container" class="container">
    <div class="grix xs3 gutter-xs0 mb-3 rounded-4" v-for="(user, index) in userList" :key="user.id">
      <div class="txt-center rank d-flex vcenter fx-center rounded-tl3 rounded-bl3">
        <div class="">{{ index }}</div> 
      </div>
      <div class="col-xs2 txt-center namerank ">
        <div class="txt-left">
          {{ user.name }}
        </div>
        <div>
          60383
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: 'ranklist',
  data () {
    return {
      userList: []
    }
  },
  mounted(){
    axios.get('https://clicker.vincent-dimarco.fr/api/users')
      .then(response => {
          this.userList= response.data;
      })
  },
}
</script>

<style lang="scss" scoped>

  
  .rank{
    background-color: var(--ion-color-primary);
    div{
      color: var(--ion-text-color);
    }
  }
  .namerank{
    background-color: var(--ion-color-primary-contrast);
    div{
      color: var(--ion-color-light);
      
    }
  }
</style>