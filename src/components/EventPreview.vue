<template>
  <CCard v-if="event" class="main bg-white shadow transition-transform duration-300 hover:-translate-y-1">
    <CCardImage class="sizefixed" v-if="imagelink" orientation="top" :src="imagelink" />
    <CCardBody class="flex flex-col justify-between">
      <CCardTitle class="text-base sm:text-lg md:text-xl lg:text-2xl">{{ truncatedTitle }}</CCardTitle>
      <div v-if="isAdmin" class="mt-4">
        <router-link :to="'/edit/' + event.id">
          <CButton class="bg-purple-700 text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded hover:bg-purple-800 transition duration-300 mr-2">Edit</CButton>
        </router-link>
        <CButton class="bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded hover:bg-red-700 transition duration-300" @click="deleteEvent(event.id)">Delete</CButton>
      </div>
      <div v-else>
        <CCardText class="text-sm sm:text-base md:text-lg lg:text-xl">{{ truncatedDescription }}</CCardText>
        <p class="text-xs sm:text-sm md:text-base lg:text-lg text-[#F9B115] mb-1">{{ event.category }} | {{ formattedDate }}</p>
      </div>
    </CCardBody>
  </CCard>
</template>

<style scoped>
.main {
  max-width: 100%;
  height: 280px;
}

.sizefixed {
  height: 240px;
  object-fit: cover;
}

@media (max-width: 1400px) {
  .sizefixed {
    height: 150px;
  }
}

@media (min-width: 640px) {
  .sizefixed {
    height: 120px;
  }
}
</style>

<script>
import { deleteEvent, getEvent } from '@/firebase/Firestore/getQuiz';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/vue';

export default {
  props: ['event', 'isAdmin'],
  components: {
    CCard,
    CCardImage,
    CCardBody,
    CCardTitle,
    CCardText,
    CButton
  },
  data() {
    return {
      event: null,
      imagelink: null,
    };
  },
  computed: {
    truncatedTitle() {
      return this.event.title.length > 15 ? this.event.title.slice(0, 15) + '...' : this.event.title;
    },
    truncatedDescription() {
      return this.event.description.length > 20 ? this.event.description.slice(0, 20) + '...' : this.event.description;
    },
    formattedDate() {
      const date = new Date(this.event.date);
      return date.toLocaleDateString();
    }
  },
  methods: {
    async deleteEvent(eventId) {
      const isConfirmed = confirm("Are you sure you want to delete this event?");
      if (isConfirmed) {
        await deleteEvent(eventId);
        window.location.reload();
      }
    }
  },
  async created() {
    if (typeof(this.event) === 'string') {
      const data = await getEvent(this.event);
      this.event = data;
    } else {
      this.event = this.event;
    }

    if (this.event == null) {
      return;
    }

    if (this.event.imageURL != null && this.event != '') {
      this.imagelink = this.event.imageURL;
    } else {
      this.imagelink = "https://coreui.io/vue/docs/images/vue.jpg";
    }
  }
};
</script>
