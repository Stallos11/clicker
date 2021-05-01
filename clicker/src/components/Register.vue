<template>
  <div class="container">
    <div class="card white rounded-2 shadow-1 mt-5">
      <div class="card-content pt-0">
        <form @submit.prevent="formSubmit" method="POST" class="form-material">
          <div class="form-field">
            <input type="text" id="name" class="form-control rounded-1" v-model="name" />
            <label for="name">Name</label>
          </div>
          <div class="form-field">
            <input type="text" id="email" class="form-control rounded-1" v-model="email" />
            <label for="email">Email</label>
          </div>
          <div class="form-field">
            <input type="password" id="pwd" class="form-control rounded-1" v-model="password" />
            <label for="pwd">Password</label>
          </div>
          <div class="form-field">
            <input type="password" id="pwd-confirm" class="form-control rounded-1" v-model="passwordConfirmation" />
            <label for="pwd-confirm">Confirm password</label>
          </div>
          <button type="submit" value="submit" class="btn orange txt-white rounded-1 mt-3">Submit</button>
        </form>
      </div>
    </div>
    <p class="mx-2">Already registered ?<router-link to="/" class="txt-orange txt-dark-1 font-w600 ml-2">Login</router-link></p>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { store } from "../store";
import { Axentix } from "axentix";

export default {
  mounted() {
    Axentix.updateInputs();
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  methods: {
    formSubmit() {
      axios
        .post(
          "https://projet.vincent-dimarco.fr/api/auth/register",
          {
            name: this.name,
            email: this.email,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation,
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
          console.log(error.response);
        });
    },
  },
};
</script>
