<template>
    <div class="container">
        <div class="card white rounded-2">
            <div class="card-header">Register</div>
            <div class="card-content">
                <form @submit.prevent="formSubmit" method="POST" class="form-material">
                    <div class="form-field">
                        <input type="text" id="name" class="form-control rounded-1" v-model="name"/>
                        <label for="name">Name</label>
                    </div>
                    <div class="form-field">
                        <input type="text" id="email" class="form-control rounded-1" v-model="email"/>
                        <label for="email">Email</label>
                    </div>
                    <div class="form-field">
                        <input type="password" id="pwd" class="form-control rounded-1" v-model="password"/>
                        <label for="pwd">Password</label>
                    </div>
                    <div class="form-field">
                        <input type="password" id="pwd-confirm" class="form-control rounded-1" v-model="passwordConfirmation"/>
                        <label for="pwd-confirm">Confirm password</label>
                    </div>
                    <button type="submit" value="submit" class="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data() {
            return {
              name: '',
              email: '',
              password: '',
              passwordConfirmation: ''
            };
        },
        methods: {
            formSubmit() {
                axios.post('https://clicker.vincent-dimarco.fr/api/auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    passwordConfirmation: this.passwordConfirmation,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                }
            })
            .then(response => { 
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });
        }
        }
    }
</script>