<template>
  <div class="container-fluid">
    <div class="wrap">
      <form class="form">
        <!-- Email input -->
        <div class="form-outline mb-4">
          <input type="email" id="form2Example1" class="form-control" v-model="email"/>
          <label class="form-label" for="form2Example1">User name</label>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
          <input type="password" id="form2Example2" class="form-control" v-model="password" />
          <label class="form-label" for="form2Example2">Password</label>
        </div>

        <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4">
          <div class="col d-flex justify-content-center">
            <!-- Checkbox -->
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label class="form-check-label" for="form2Example31"> Remember me </label>
            </div>
          </div>
        </div>

        <!-- Submit button -->
        <div class="text-center">
          <button type="button" class="btn btn-primary btn-block mb-4" @click="login">Sign in</button>
        </div>

        <!-- Register buttons -->
        <div class="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import ApiService from "@/services/api.service";
import { useRouter } from 'vue-router';
const router = useRouter();

import { ref } from 'vue';
const email = ref('');
const password = ref('');
// const token = ref

async function login() {
  const response = await ApiService.post("/auth/signIn",{
    account : email.value,
    password : password.value
  });
 
  if(response.status == 200) {
    const token = response.headers.authorization;
    localStorage.setItem('token', token);
    router.push("/")
  }
}

    
  

</script>
<style scope>
.wrap {
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  display: flex;
  margin: 0 auto;
}
.form {
  width: 100%;
  margin: auto;
}

</style>