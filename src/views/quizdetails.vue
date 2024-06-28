<template>
  <div v-if="event" class="min-h-screen flex mt-10 items-center justify-center bg-light-purple p-6">
    <div class="max-w-4xl w-full bg-white rounded-lg shadow-md p-8 md:p-12 lg:p-16" id="parent">
      <div class="flex mb-8">
        <div class="left">
          <img :src="event.image" alt="Event Image" class="rounded-lg shadow-md" width="500px"/>
        </div>
        <div class="right pl-8">
          <h1 class="text-4xl mt-4 font-bold mb-4 text-dark-purple">{{ event.title }}</h1>
          <p class="text-gray-700 mb-4 text-lg">Date: <span class="font-semibold">{{ formattedDate }}</span></p>
        </div>
      </div>
      <div class="mt-8">
        <CTabs activeItemKey="description">
          <CTabList variant="underline">
            <CTab itemKey="description">Description</CTab>
            <CTab itemKey="votes">Votes</CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel class="p-6" itemKey="description">
              <h2 class="text-3xl font-semibold mb-4">Event Description</h2>
              <p v-if="event" class="text-gray-800 text-lg">{{ event.description  }}</p>
            </CTabPanel>
            <CTabPanel class="p-6" itemKey="votes">
              <h2 class="text-3xl font-semibold mb-4">Votes</h2>
              <p class="text-lg mb-4">Yes: <span class="font-semibold">{{ event.yesVotes }}</span></p>
              <p class="text-lg mb-4">No: <span class="font-semibold">{{ event.noVotes }}</span></p>
              <div class="flex space-x-4">
                <button @click="vote('yes')" class="px-8 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">Yes</button>
                <button @click="vote('no')" class="px-8 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">No</button>
              </div>
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </div>
      <button @click="backhome" class="take-quiz-btn mt-8 inline-block px-12 py-3 bg-dark-yellow text-white rounded hover:bg-dark-yellow-dark">Back</button>
    </div>
  </div>
</template>

<script>
import { CTabs, CTabList, CTab, CTabContent, CTabPanel } from '@coreui/vue';
import { getEvent, updateEvent } from '@/firebase/Firestore/getQuiz';
import { getUserById, getUser } from '@/firebase/Authentification/getUser';

export default {
  name: 'EventDetails',
  components: {
    CTabs,
    CTabList,
    CTab,
    CTabContent,
    CTabPanel
  },
  data() {
    return {
      event: null,
    };
  },
  async created() {
    this.event = await getEvent(this.$route.params.id);
  },
  computed: {
    formattedDate() {
      return new Date(this.event.date).toLocaleString();
    }
  },
  methods: {
    async vote(type) {
      const updatedVotes = type === 'yes' ? { yesVotes: this.event.yesVotes + 1 } : { noVotes: this.event.noVotes + 1 };
      await updateEvent(this.event.id, updatedVotes);
      this.event = await getEvent(this.event.id); // Refresh event data
    },
    backhome() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
/* Custom styles */
#parent
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

.text-dark-purple {
  color: #7600bc;
}

.bg-light-purple {
  background-color: #F8F7FF;
}

.bg-dark-yellow {
  background-color: #F9B115;
}

.bg-dark-yellow-dark {
  background-color: #d28f00;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.mt-8 {
  margin-top: 2rem;
}

.mb-4 {
  margin-bottom: 1rem;
  margin-left: 20px;
}

.mb-8 {
  margin-bottom: 2rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.left, .right {
  width: 100%;
}

.pl-8 {
  padding-left: 2rem;
}

.p-6 {
  padding: 1.5rem;
  margin-right: 50px;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.min-h-screen {
  min-height: 100vh;
}

.inline-block {
  display: inline-block;
}

.rounded {
  border-radius: 0.25rem;
}

.transition {
  transition: background-color 0.3s ease;
}

.hover\:bg-dark-yellow-dark:hover {
  background-color: #d28f00;
}

@media screen and (max-width: 1024px) {
  .flex {
    flex-direction: column;
  }

  .left, .right {
    width: 100%;
    margin: 0;
  }

  .pl-8 {
    padding-left: 0;
  }
}

@media screen and (max-width: 768px) {
  .p-6 {
    margin-right: 0;
  }

  .take-quiz-btn,
  .back-btn {
    padding: 8px 10px;
    font-size: 14px;
  }
}
</style>
