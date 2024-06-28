<template>
  <div class="welcome"></div>
  <div class="container flex items-center justify-center min-h-screen">
    <div v-if="showLogin" class="form-container p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-sm text-center text-white">
      <h2 class="form-heading text-2xl font-bold mb-4">Login</h2>
      <LoginForm @login="enterForum" />
      <p class="form-text mt-4">No account yet? <span @click="showLogin = false" class="form-link cursor-pointer underline">Signup</span> instead.</p>
    </div>
    <div v-else class="form-container p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-sm text-center text-white">
      <h2 class="form-heading text-2xl font-bold mb-4">Sign up</h2>
      <SignupForm @signup="enterForum" />
      <p class="form-text mt-4">Already registered? <span @click="showLogin = true" class="form-link cursor-pointer underline">Login</span> instead.</p>
    </div>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue'
import LoginForm from '../components/LoginForm.vue'

export default {
  components: { SignupForm, LoginForm },
  data() {
    return {
      showLogin: false    
    }
  },
  methods: {
    enterForum(){
      this.$router.push('/browse');
    }
  }
}
</script>

<style scoped>
.welcome {
  background-image: url('@/assets/backgroundauth.webp');
  background-size: cover;
  background-position: center;
  position: absolute;
  filter: blur(10px);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.container {
  min-height: 100vh; /* Ensure container takes full height */
}

.form-container {
  background-color: rgba(255, 255, 255, 0.2); /* White background with transparency */
}

.signup-button {
  background-color: #7600bc;
}

.signup-button:hover {
  background-color: #5f00a3;
}

.text-white {
  color: #ffffff; /* Ensure text is white */
}
</style>
