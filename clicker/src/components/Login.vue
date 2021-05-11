<template>
  <div class="container d-flex fx-col pb-5">
    <div class="card white shadow-1 rounded-2 my-5 mb-4 w100">
      <div class="card-content">
        <form @submit.prevent="formLogin" method="POST" class="form-material">
          <div class="form-field">
            <input type="text" id="email" class="form-control rounded-1" v-model="email" />
            <label for="email">Email</label>
          </div>
          <div class="form-field">
            <input type="password" id="pwd" class="form-control rounded-1" v-model="password" />
            <label for="pwd">Password</label>
            <span :class="password.length < 1 || password.length >= 8 ? 'txt-transparent': 'txt-red'" class="form-helper txt-center">Password must be at least 8 characters long.</span>
          </div>
          <button :disabled="password.length < 8" type="submit" value="submit" class="btn orange dark-1 txt-white rounded-1 mt-4 light-shadow-2">Submit</button>
        </form>
      </div>
    </div>
    <p class="mx-2">
      Not already registered ?<router-link to="/register" class="txt-orange txt-dark-1 font-w600 ml-2">Register</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { store } from "../store";
import { Axentix } from "axentix";
import moment from "moment";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    Axentix.updateInputs();
  },
  methods: {
    formLogin() {
      axios
        .post(
          "https://projet.vincent-dimarco.fr/api/auth/login",
          {
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const data = response.data;
          const token = data.access_token;
          const updateAt = data.user.updated_at;
          const dateTime = moment(updateAt).format("YYYY-MM-DD HH:mm:ss");
          const diff = moment().diff(dateTime, "seconds");
          store.state.timeDiff = diff;
          store.state.token = token;

          if (data.user) {
            store.state.isLogged = true;
            store.state.userID = data.user.id;
            store.state.actualMoney = data.user.actualMoney;
            store.state.username = data.user.name;
            store.state.buildings = JSON.parse(data.user.buildings);

            this.$router.push("/tabs/");
          }
        })
        .catch((error) => {
          console.error("error", error.response);
        });
    },
  },
};
</script>
