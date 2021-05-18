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
          <span class="font-w600 txt-white">{{ username }}</span> <br />
          <span class="txt-grey txt-light-1">{{ actualMoney }}$</span>
        </p>
        <div class="txt-center txt-white font-s3 font-w600 bd-b-solid bd-3 bd-white ml-auto my-auto mr-3 pb-1">
          N ° {{ currentUserRanking + 1 }}
        </div>
      </div>

      <div class="ranklist relative-pos white d-flex fx-col light-shadow-2 rounded-2">
        <button :disabled="canRefresh == false" @click="refreshList" class="refresh-icon gradient txt-white font-s6 light-shadow-1 rounded-full txt-center p-0">
          <ion-icon :icon="refreshOutline"></ion-icon>
        </button>
        <div class="mx-4" v-for="(user, index) in userList" :key="user.id">
          <div class="d-flex">
            <div
              style="height: 40px; width: 40px;"
              class="txt-center airforce dark-4 font-s3 font-w600 rounded-full pt-2 ml-2 my-auto d-table"
            >
              {{ index + 1 }}
            </div>
            <p class="ml-4">
              <span class="font-w600 txt-airforce txt-dark-3">{{ user.name }}</span> <br />
              <span class="txt-grey txt-light-1">{{ user.actualMoney }}$</span>
            </p>
          </div>
          <div v-if="index !== userList.length - 1" class="divider bd-grey bd-light-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IonIcon } from "@ionic/vue";
import { refreshOutline } from "ionicons/icons";
import { store } from "../store";

export default {
  name: "ranklist",
  components: { IonIcon },
  data: () => ({
    canRefresh: true
  }),
  setup() {
    return {
      refreshOutline
    };
  },
  computed: {
    currentUserRanking() {
      return store.state.currentUserRanking;
    },
    userList() {
      return store.state.userList;
    },
    loading() {
      return store.state.loading;
    },
    username() {
      return store.state.username;
    },
    actualMoney() {
      return store.state.actualMoney;
    },
  },
  methods: {
    refreshList() {
      this.canRefresh = false;
      store.dispatch("updateRankList");

      setTimeout(() => {
        this.canRefresh = true;
      }, 10000);
    }
  },
  mounted() {
    store.dispatch("updateRankList");
  }
};
</script>

<style lang="scss" scoped>
.gradient {
  background: linear-gradient(150deg, #374b5c 0%, #20314b 33%, #0b1d2b 100%);
}

.refresh-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 38px;
  height: 38px;
  transform: translate(30%, -30%);
}
</style>
