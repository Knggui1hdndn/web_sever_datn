<template>
  <div class="login-background">
    <div class="container">
      <div class="login-wrap">
        <form class="login-form">
          <div class="form-group">
            <label for="email">Email/Phone Number</label>
            <input type="email" id="email" class="form-control" v-model="email" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control" v-model="password" />
          </div>

          <!-- Remember me checkbox -->
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="rememberMe" checked />
            <label class="form-check-label" for="rememberMe">Remember me</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" v-model="roleType"
              value="ADMIN">
            <label class="form-check-label" for="flexRadioDefault1">
              Admin
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="roleType"
              value="MEMBER">
            <label class="form-check-label" for="flexRadioDefault2">
              Membership
            </label>
          </div>


          <button type="button" class="btn btn-primary btn-block" @click="login">Sign in</button>

          <!-- Register link -->
          <div class="register-link">
            <p>Not a member? <a href="#!">Register</a></p>
          </div>
        </form>
      </div>
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
const message = ref('');
const roleType = ref('MEMBER'); 

async function login() {
  try {
    const response = await ApiService.post(`/auth/signIn?roleType=${roleType.value}`, {
      account: email.value,
      password: password.value
    });
    if (response.status === 200) {
      const token = response.headers.authorization;
      const role = response.data.roleType; 

      localStorage.setItem('role', role);
      localStorage.setItem('token', token);
      message.value = 'Login successful!';
      window.alert(message.value);
      console.log(roleType);
      if (roleType.value === 'MEMBER') {
        router.push("/orders");
      } else {
        router.push("/");
      }
    }
    console.log(roleType.value === 'MEMBER');
    
  } catch (error) {
    console.error("Error during login:", error);
    message.value = 'Login failed. Please check your credentials.';
    window.alert(message.value);
  }
}

</script>

<style scoped>
.login-background {
  background-image: url('https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-thoi-trang-dang-hien-dai-nhat_113856210.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.container {
  max-width: 400px;
  margin: auto;
}

.login-wrap {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.register-link {
  text-align: center;
  margin-top: 15px;
  color: #007bff;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
