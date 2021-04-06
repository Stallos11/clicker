<template>
    <div class="container">
        <div class="card white rounded-2">
            <div class="card-header">Login</div>
            <div class="card-content">
                <form @submit.prevent="formLogin" method="POST" class="form-material">
                    <div class="form-field">
                        <input type="text" id="email" class="form-control rounded-1" v-model="email"/>
                        <label for="email">Email</label>
                    </div>
                    <div class="form-field">
                        <input type="password" id="pwd" class="form-control rounded-1" v-model="password"/>
                        <label for="pwd">Password</label>
                    </div>
                    <button type="submit" value="submit" class="btn btn-success">Submit</button>
                </form>
                <div>
                    <router-link to="/tabs/tab2" class="btn">Test</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { store } from '../store';
import { Axentix } from 'axentix';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    mounted() {
        console.log('Component mounted.')
        Axentix.updateInputs();
    },
    methods: {
        formLogin() {
            axios.post('http://127.0.0.1:8000/api/auth/login', {
                email: this.email,
                password: this.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
            }
        })
        .then(response => { 
            const token = response.data.access_token;
            store.state.token = token;
            store.state.buildings = JSON.parse(response.data.user.buildings);

            
            console.log("B1 " , store.state.buildings["b2"]);

        })
        .catch(error => {
            console.log(error.response)
        })}
    }
}
</script>