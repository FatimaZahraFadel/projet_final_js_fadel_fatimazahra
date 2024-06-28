<template>
  <div class="flex items-center justify-center bg-cover bg-center">
    <form @submit.prevent="handleSignUP" class="form-container p-8 rounded-lg shadow-md w-full max-w-md text-black">
      <input type="text" required placeholder="Display name" v-model="displayName" class="input-field mb-4 border-[#9381FF] w-full p-3 border rounded-md">
      <input type="email" required placeholder="Your email" v-model="email" class="input-field mb-4 border-[#9381FF] w-full p-3 border rounded-md">
      <input type="password" required placeholder="Your password" v-model="password" class="input-field mb-4 border-[#9381FF] w-full p-3 border rounded-md">
      <button class="signup-button w-full py-2 text-white rounded-md transition duration-300">Sign up</button>
      <div class="error text-red-500 mt-4">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import useSignup from '@/firebase/Authentification/useSignup';
import { ref } from 'vue';

const emit = defineEmits(['customEvent']);

const displayName = ref('')
const email = ref('')
const password = ref('')

const { error, signup } = useSignup()

const handleSignUP = async () => {
    await signup(email.value, password.value, displayName.value)
    if (!error.value) {
      emit('signup')
    }
}
</script>

<style scoped>
.form-container {
  background-color: rgba(248, 247, 255, 0.2); /* White background with transparency */
}

.signup-button {
  background-color: #F9B115;
}

.signup-button:hover {
  background-color: #ebad29;
}
</style>
