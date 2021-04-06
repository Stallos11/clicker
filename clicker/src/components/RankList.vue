<template>
  <div id="container" class="container">
    <div v-if="loading" class="spinner txt-orange txt-dark-1 mx-auto d-flex">
      <svg viewBox="25 25 50 50">
        <circle class="spinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="3" />
      </svg>
    </div>
    <div v-else class="mb-3">
      <div class="d-flex gradient light-shadow-2 rounded-2 my-4">
        <p class="ml-3">
          <span class="font-w600 txt-white">Mon classement</span> <br>
          <span class="txt-grey txt-light-1">{{ actualMoney }}$</span>
        </p>
        <div class="txt-center txt-white font-s3 font-w600 bd-b-solid bd-3 bd-white ml-auto my-auto mr-3 pb-1">
          N ° {{ currentUserRanking + 1 }}
        </div>
      </div>

      <div class="white d-flex fx-col light-shadow-2 rounded-2">
        <div class="mx-4" v-for="(user, index) in userList" :key="user.id">
          <div class="d-flex">
            <div style="height: 40px; width: 40px;" class="txt-center airforce dark-4 font-s3 font-w600 rounded-full pt-2 ml-2 my-auto mr-4">
              {{ index }}
            </div>
            <p>
              <span class="font-w600 txt-airforce txt-dark-3">{{ user.name }}</span> <br>
              <span class="txt-grey txt-light-1">{{ user.actual_money }}$</span>
            </p>
          </div>
          <div v-if="index !== userList.length-1" class="divider bd-grey bd-light-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { store } from '../store';

export default {
  name: 'ranklist',
  data () {
    return {
      userList: [],
      currentUserRanking: null,
      config: '',
      actualMoney: store.state.actualMoney,
      loading: true
    }
  },
  mounted(){
    this.config = {
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      }
    };
    this.getRankings();
    this.getUserRanking();
  },
  methods: {
    getRankings() {
      this.loading = true;
      axios.get(
        'https://clicker.vincent-dimarco.fr/api/auth/users',
        this.config
      )
      .then(response => {
        console.log(response);
        this.userList = response.data;
        this.loading = false;
      })
      .catch(error => {
          console.log("error", error.response);
      });
    },
    getUserRanking() {
      this.loading = true;
      axios.get(
        'https://clicker.vincent-dimarco.fr/api/auth/user/rank?id=' + store.state.userID,
        this.config
      )
      .then(response => {
        console.log(response);
        this.currentUserRanking = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.log("error", error.response);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.gradient {
  background: linear-gradient(150deg, #374b5c 0%, #20314b 33%, #0b1d2b 100%);
}  
</style>