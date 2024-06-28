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
          <span class="material-icons">add_circle</span> Create quiz!
        </router-link>
      </div>

      <div class="flex flex-col lg:flex-row items-center space-y-5 lg:space-y-0 lg:space-x-5">
        <div class="relative w-full lg:w-auto">
          <select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" @change="filterByCategory">
            <option value="Any Category">Any Category</option>
            <option value="General Knowledge">General Knowledge</option>
            <option value="Entertainment: Books">Entertainment: Books</option>
            <option value="Entertainment: Film">Entertainment: Film</option>
            <option value="Entertainment: Music">Entertainment: Music</option>
            <option value="Entertainment: Television">Entertainment: Television</option>
            <option value="Entertainment: Video Games">Entertainment: Video Games</option>
            <option value="Entertainment: Board Games">Entertainment: Board Games</option>
            <option value="Entertainment: Musicals & Theatres">Entertainment: Musicals & Theatres</option>
            <option value="Science & Nature">Science & Nature</option>
            <option value="Science: Computers">Science: Computers</option>
            <option value="Science: Mathematics">Science: Mathematics</option>
            <option value="Mythology">Mythology</option>
            <option value="Sports">Sports</option>
            <option value="Geography">Geography</option>
            <option value="History">History</option>
            <option value="Politics">Politics</option>
            <option value="Art">Art</option>
            <option value="Celebrities">Celebrities</option>
            <option value="Animals">Animals</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Entertainment: Comics">Entertainment: Comics</option>
            <option value="Science: Gadgets">Science: Gadgets</option>
            <option value="Entertainment: Japanese Anime & Manga">Entertainment: Japanese Anime & Manga</option>
            <option value="Entertainment: Cartoon & Animations">Entertainment: Cartoon & Animations</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-6 1.5-1.5L10 9l6-6 1.5 1.5L10 12z"/></svg>
          </div>
        </div>
      </div>
    </div>

    <div v-if="quizzes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      <div v-for="quiz in filter" :key="quiz.id" class="w-full">
        <QuizPreview :quiz="quiz" :isAdmin="isAdmin"/>
      </div>
    </div>
  </div>
</template>

<script>
import QuizPreview from '@/components/QuizPreview.vue';
import { getQuizes } from '@/firebase/Firestore/getQuiz';

export default {
  components: {
    QuizPreview,
  },
  data() {
    return {
      isAdmin: true,
      quizzes: [],
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
      return this.quizzes.filter(quiz => {
        return (this.category === "Any Category" || quiz.category.toLowerCase() === this.category.toLowerCase()) && (this.difficulty === "Any Difficulty" || quiz.difficulty.toLowerCase() === this.difficulty.toLowerCase());
      });
    }
  },
  async mounted() {
    const { posts, error, load } = getQuizes();
    await load();
    this.quizzes = posts.value;
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
