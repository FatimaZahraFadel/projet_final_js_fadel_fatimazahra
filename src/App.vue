<template>
	<div class="navbar">
		<NavBar @visiblechange="toggleSideBar"/>
		<SideBar :isSidebarVisible="isSidebarVisible" @visiblechange="toggleSideBar"/>
	</div>

	<router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';

export default {
  name: 'App',
  components: { NavBar, SideBar },
  data() {
	return {
		isSidebarVisible: false,
	};
  },
  methods: {
	toggleSideBar(forceclose) {
		if (forceclose){
			this.isSidebarVisible = false;
		}
		else{
			this.isSidebarVisible = !this.isSidebarVisible;
		}
	},
  },

  mounted() {},
}
</script>

<style>
	html, body {
		overscroll-behavior: contain;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
	
	body {
		background-color: #F8F7FF;
	}

	.darkpurple{
		color: #7600bc;
	}
	.lightpurple{
		color: #9381FF;
	}
	.light{
		color: #F8F7FF;
	}
	.lightyellow{
		color: #FFD8DE;
	}
	.darkyellow{
		color: #F9B115;
	}
</style>
