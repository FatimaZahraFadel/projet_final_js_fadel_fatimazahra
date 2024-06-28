<template>
  <div class="create-container max-w-2xl mx-auto mt-20 p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
    <form @submit.prevent="submitEvent">
      <div class="flex justify-between">
        <div class="w-1/3">
          <label for="event-title" class="block mb-2 font-semibold text-gray-700">Event Title:</label>
          <input type="text" id="event-title" v-model="eventTitle" required class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300"/>
        </div>
        <div class="w-1/3 ml-4">
          <label for="event-category" class="block mb-2 font-semibold text-gray-700">Category:</label>
          <select id="event-category" v-model="eventCategory" required class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300">
            <option value="Concert">Concert</option>
            <option value="Sports">Sports</option>
            <option value="Theater">Theater</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>
        <div class="w-1/3 ml-4">
          <label for="event-date" class="block mb-2 font-semibold text-gray-700">Date:</label>
          <input type="datetime-local" id="event-date" v-model="eventDate" required class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300"/>
        </div>
      </div>
      <label for="event-image" class="block mb-2 font-semibold text-gray-700">Image URL:</label>
      <input type="text" id="event-image" v-model="eventImage" class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300"/>

      <label for="event-description" class="block mb-2 font-semibold text-gray-700">Description:</label>
      <textarea id="event-description" v-model="eventDescription" required class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300"></textarea>

      <div class="button-container text-center">
        <button type="submit" class="mt-4 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">Edit Event</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getEvent, updateEvent } from '@/firebase/Firestore/getQuiz';

export default {
  data() {
    return {
      eventTitle: '',
      eventCategory: '',
      eventDescription: '',
      eventDate: '',
      eventImage: '',
    };
  },
  methods: {
    async submitEvent() {
      const eventId = this.$route.params.id;
      const data = {
        title: this.eventTitle,
        category: this.eventCategory,
        description: this.eventDescription,
        date: new Date(this.eventDate).toISOString(),
        imageURL: this.eventImage,
      };
      await updateEvent(eventId, data);
      this.$router.push('/dashboard');
    }
  },
  async mounted() {
    const eventId = this.$route.params.id;
    if (eventId) {
      const data = await getEvent(eventId);
      this.eventTitle = data.title;
      this.eventCategory = data.category;
      this.eventDescription = data.description;
      this.eventDate = new Date(data.date).toISOString().slice(0, 16);
      this.eventImage = data.imageURL;
    }
  }
};
</script>

<style scoped>
.create-container {
  max-width: 2xl;
  margin: auto;
  margin-top: 20px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.create-container:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #805ad5;
  box-shadow: 0 0 0 3px rgba(128, 90, 213, 0.2);
}

.button-container {
  text-align: center;
  margin-bottom: 24px;
}

button {
  margin-top: 16px;
  padding: 16px;
  background-color: #6b46c1;
  color: white;
  border-radius: 8px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #553c9a;
}
</style>
