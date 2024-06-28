<template>
    <div
    :class="[
    'fixed trans w-[250px] h-[calc(100vh-56px)] overflow-hidden z-50 bg-[#7600bc] flex flex-col justify-between', 
    { 'top-[60px]': isSidebarVisible, 'top-[-100vh]': !isSidebarVisible }]"
        @visible-change="isSidebarVisible = $event"
    >
      <div class="text-white">
        <router-link class="gaper mt-10 flex items-center p-4 cursor-pointer hover:bg-[#9381FF]" to='/'>
          <span class="material-icons mr-2">home</span> Home 
        </router-link>
        <router-link class="gaper flex items-center p-4 cursor-pointer hover:bg-[#9381FF]" to='/browse'>
          <span class="material-icons mr-2">search</span> Browse
        </router-link>
        <router-link class="gaper flex items-center p-4 cursor-pointer hover:bg-[#9381FF]" to='/leaderboard'>
          <span class="material-icons mr-2">leaderboard</span> Leaderboard
        </router-link>
        <router-link class="gaper mt-10 flex items-center p-4 cursor-pointer hover:bg-[#9381FF]" to='/dashboard'>
          <span class="material-icons mr-2">dashboard</span> Dashboard <CBadge class="ml-2" color="danger">Admin</CBadge> 
        </router-link>
        <CDropdownDivider class="border-[#FFD8BE]" />
      </div>
      <div class="flex items-center p-4 cursor-pointer text-white hover:bg-[#9381FF]" @click="handleSignOut">
        <span class="material-icons mr-2">logout</span> Sign Out
      </div>
    </div>
  </template>
  
<script>
import signOut from '@/firebase/Authentification/SignOut';

  import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavTitle,
    CNavItem,
    CNavGroup,
    CIcon,
    CBadge,
    CSidebarFooter,
    CSidebarToggler,
    CDropdownDivider,
  } from '@coreui/vue'
  
  export default {
    emits: ['visiblechange'],
    components: {
      CSidebar,
      CSidebarBrand,
      CSidebarHeader,
      CSidebarNav,
      CNavTitle,
      CNavItem,
      CDropdownDivider,
      CNavGroup,
      CIcon,
      CBadge,
      CSidebarFooter,
      CSidebarToggler,
    },
    props: {
      isSidebarVisible: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
        goTo(path) {
            this.$router.push(path);
        },
        async handleSignOut(){
            await signOut();
            this.$router.push('/auth');
            this.$emit('visiblechange', true);
            this.user = null;  
        },
    },
  }
</script>

<style scoped>
.trans{
    transition: top 0.3s ease-in-out;
}

.router-link-exact-active {
    border-right: 5px solid #ff6f00;
    background-color: #F9B115;
}

.gaper{
  margin-bottom: 10px;
}

</style>