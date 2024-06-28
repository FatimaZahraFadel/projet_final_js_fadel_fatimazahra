<template>
	<nav class="bg-[#7600bc] text-white p-2 flex items-center justify-between fixed top-0 left-0 w-full z-60">
		<div class="flex items-center space-x-4 ml-4">
			<div v-if="user" @click="toggleSideBar" class="ptr flex items-center text-white hover:bg-[#9381FF] transition duration-300 ease-in-out rounded-md px-3 py-2">
				<span class="material-icons">menu</span>
			</div> 
			<div v-else>
				<CButton
				@click="goTo('/auth')"
				class="text-white hover:bg-[#9381FF] rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-gray-700 px-3 p-2">
				<span class="material-icons">login</span>
				</CButton>
			</div>
		</div>

		<div class="relative w-full max-w-lg mx-4">
		<input
			v-model="searchQuery"
			@keyup.enter="handleSearch"
			type="text"
			class="w-full bg-[#F8F7FF] text-black rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-[#FFD8BE]"
			placeholder="Search..."
		/>
		<span class="material-icons absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-300">search</span>
		</div>

		<button v-if="user" @click="goTo('/profile/' + user.uid)"
		class="hover:bg-[#9381FF] p-2 rounded-md  flex items-center space-x-2 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 mr-4">
			<span class="material-icons text-3xl">person</span>
			<span class="hidden sm:block text-white">Profile</span>
		</button>
	</nav>
</template>

<script>
import { getUser, waitForAuthInit, observeUserState, getUserById } from "@/firebase/Authentification/getUser";
import { CButton } from '@coreui/vue';

export default {
  emits: ['visiblechange'],
  components: {
    CButton
  },
  data() {
	return {
		user: null,
		searchQuery: '',
	}
  },
  methods: {
	handleSearch () {
	  if (this.searchQuery.trim()) {
		this.$router.push({ path: '/browse', query: { query: this.searchQuery } });
	  }
	},
	toggleSideBar () {
	  this.$emit('visiblechange', false);
	},
	goTo(path) {
	  this.$router.push(path);
	},
    async userChanged(_user) {
      this.user = _user ? await getUserById(_user.uid) : null;
    }
  },
  async mounted() {
      await waitForAuthInit();
      const currentUser = getUser();
      if (currentUser) {
        this.user = await getUserById(currentUser.uid);
      }
      observeUserState(this.userChanged);
  }
}
</script>

<style scoped>
.ptr {
	cursor: pointer;
}

nav {
	z-index: 9999;
}	
</style>
