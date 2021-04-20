<template>
  <div class="container d-flex h100 pb-5">
    <div class="card white shadow-1 rounded-2 my-auto w100">
      <div class="card-header">Login</div>
      <div class="card-content">
        <form @submit.prevent="formLogin" method="POST" class="form-material">
          <div class="form-field">
            <input type="text" id="email" class="form-control rounded-1" v-model="email" />
            <label for="email">Email</label>
          </div>
          <div class="form-field">
            <input type="password" id="pwd" class="form-control rounded-1" v-model="password" />
            <label for="pwd">Password</label>
          </div>
          <button type="submit" value="submit" class="btn orange dark-1 txt-white rounded-1 mt-4 light-shadow-2">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { store } from "../store";
import { Axentix } from "axentix";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    console.log("Component mounted.");
    Axentix.updateInputs();
  },
  methods: {
    formLogin() {
      axios
        .post(
          "https://clicker.vincent-dimarco.fr/api/auth/login",
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
          store.state.token = token;
          // console.log("response", data.user);

          if (data.user) {
            store.state.isLogged = true;
            store.state.userID = data.user.id;
            store.state.actualMoney = data.user.actual_money;
            store.state.username = data.user.name;
            store.state.buildings = JSON.parse(data.user.buildings);

            this.$router.push("/tabs/");
          }
        })
        .catch((error) => {
          console.log("error", error.response);
        });
    },
  },
};
</script>
