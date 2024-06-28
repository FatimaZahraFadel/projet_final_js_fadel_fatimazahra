<template>
  <div class="container mx-auto px-4 lg:px-8 max-w-screen-2xl">
    <div class="flex flex-col lg:flex-row justify-center py-5 space-y-5 lg:space-y-0 lg:space-x-5">
      <div class="flex flex-col lg:flex-row items-center space-y-5 lg:space-y-0 lg:space-x-5">
        <div class="relative w-full lg:w-auto">
          <select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" @change="filterByDifficulty">
            <option value="Any Difficulty">Any Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-6 1.5-1.5L10 9l6-6 1.5 1.5L10 12z"/></svg>
          </div>
        </div>
        <router-link to="/create" class="bg-[#F9B115] text-white px-4 py-2 rounded hover:bg-[#FFD8DE] transition duration-300 flex items-center w-full lg:w-auto"> 
          <span class="material-icons">add_circle</span> Create event!
        </router-link>
      </div>

      <div class="flex flex-col lg:flex-row items-center space-y-5 lg:space-y-0 lg:space-x-5">
        <div class="relative w-full lg:w-auto">
          <select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" @change="filterByCategory">
            <option value="Any Category">Any Category</option>
            <option value="Concert">Concert</option>
            <option value="Sports">Sports</option>
            <option value="Theater">Theater</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-6 1.5-1.5L10 9l6-6 1.5 1.5L10 12z"/></svg>
          </div>
        </div>
      </div>
    </div>

    <div v-if="events.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      <div v-for="event in filter" :key="event.id" class="w-full">
        <EventPreview :event="event" :isAdmin="isAdmin"/>
      </div>
    </div>
  </div>
</template>

<script>
import EventPreview from '@/components/EventPreview.vue';
import { getEvents } from '@/firebase/Firestore/getQuiz';

export default {
  components: {
    EventPreview,
  },
  data() {
    return {
      isAdmin: true,
      events: [],
      category: "Any Category",
      difficulty: "Any Difficulty",
    };
  },
  methods: {
    filterByDifficulty(event) {
      this.difficulty = event.target.value;
    },
    filterByCategory(event) {
      this.category = event.target.value;
    },
  },
  computed: {
    filter() {
      return this.events.filter(event => {
        return (this.category === "Any Category" || event.category.toLowerCase() === this.category.toLowerCase()) && (this.difficulty === "Any Difficulty" || event.difficulty.toLowerCase() === this.difficulty.toLowerCase());
      });
    }
  },
  async mounted() {
    const { posts, error, load } = getEvents();
    await load();
    this.events = posts.value;
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  select {
    padding: 0.5rem 0.75rem;
  }
  .router-link {
    padding: 0.5rem 0.75rem;
  }
}
.btn:hover {
  filter: brightness(110%);
}
</style>
