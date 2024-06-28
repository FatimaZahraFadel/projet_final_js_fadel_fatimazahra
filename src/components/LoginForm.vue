<template>
  <div class="flex items-center justify-center bg-cover bg-center">
    <form @submit.prevent="handleLogin" class="form-container p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md text-center text-black">
      <input type="email" required placeholder="Your email" v-model="email" class="input-field mb-4 border-[#9381FF] w-full p-3 border rounded-md">
      <input type="password" required placeholder="Your password" v-model="password" class="input-field mb-4 border-[#9381FF] w-full p-3 border rounded-md">
      <button class="login-button w-full py-2 text-white rounded-md transition duration-300" style="background-color: #F9B115;">Login</button>
      <div class="error text-red-500 mt-4">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import useLogin from '@/firebase/Authentification/useLogin';
import { ref } from 'vue';

const email = ref('')
const password = ref('')
const {error, login} = useLogin()

const emit = defineEmits(['customEvent']);

const handleLogin = async () => {
  const response = await login(email.value, password.value)
  if(!error.value){
    console.log("USER LOGGED SUCCESS")
    emit('login')
  } else {
    console.log("USER NOT LOGGED")
  }
}
</script>

<style scoped>
.form-container {
  background-color: rgba(248, 247, 255, 0.2); /* White background with transparency */
}

.login-button {
  background-color: #F9B115;
}

.login-button:hover {
  background-color: #ebad29;
}
</style>