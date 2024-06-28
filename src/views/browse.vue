<template>
  <div v-if="queryExists">
    <div class="back-button-container2">
      <router-link to="/browse" class="back-button2">Back</router-link>
    </div>
    <br><br>
    <div class="container mx-auto px-4 sm:px-8 lg:px-20">
      <div v-if="filteredquizzes.length > 0" class="grid-container2">
        <div v-for="quiz in filteredquizzes" :key="quiz.id" class="quiz-card2">
          <router-link :to="'/quizdetails/' + quiz.id">
            <QuizPreview class="prev2" :quiz="quiz" :isAdmin="isAdmin" />
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>No quizzes found for your search query.</p>
      </div>
    </div>
  </div>
  <div v-else class="container mx-auto px-4 sm:px-8 lg:px-20">
    <div class="filter-container">
      <label for="category" class="sr-only">Select a category</label>
      <select id="category" name="category" v-model="selectedCategory" @change="scrollToCategory" class="category-selector">
        <option disabled value="">Select a category</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600">Popular:</h1>
    <swiper :slides-per-view="slidesPerView" :modules="modules"
      :space-between="spaceBetween"
      navigation >
      <swiper-slide v-for="quiz in quizzes" :key="quiz.id" class="quiz-card">
        <router-link :to="'/quizdetails/' + quiz.id">
          <QuizPreview class="prev" :quiz="quiz" :isAdmin="isAdmin" />
        </router-link>
      </swiper-slide>
    </swiper>

    <div v-for="category in categories" :key="category" class="category-section">
      <br :id="category" > 
      <h1 class="mt-10 mb-10 text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600">{{ category }}:</h1>
      <swiper :modules="modules"
        :slides-per-view="categorySlidesPerView"
        :space-between="spaceBetween"
        navigation
        v-if="filteredQuizzes(category).length">
        <swiper-slide v-for="quiz in filteredQuizzes(category)" :key="quiz.id" class="quiz-card">
          <RouterLink :to="'/quizdetails/' + quiz.id">
            <QuizPreview class="prev" :quiz="quiz" :isAdmin="isAdmin" />
          </RouterLink>
        </swiper-slide>
      </swiper>
      <p v-else>No quizzes available in this category.</p>
    </div>
  </div>
</template>

<script>
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import QuizPreview from '@/components/QuizPreview.vue';
import { getQuizes } from '@/firebase/Firestore/getQuiz';

export default {
  components: {
    Swiper,
    SwiperSlide,
    QuizPreview,
  },
  data() {
    return {
      isAdmin: false,
      quizzes: [],
      categories: [
        "General Knowledge", "Entertainment: Books", "Entertainment: Film",
        "Entertainment: Music", "Entertainment: Television",
        "Entertainment: Video Games", "Entertainment: Board Games", "Entertainment: Musicals & Theatres", "Science & Nature",
        "Science: Computers", "Science: Mathematics", "Mythology", "Sports", "Geography",
        "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles",
        "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime & Manga",
        "Entertainment: Cartoon & Animations"
      ],
      spaceBetween: 10,
      slidesPerView: 3,
      categorySlidesPerView: 3,
      query: '',
      queryExists: false,
      selectedCategory: '', 
    };
  },
  methods: {
    filteredQuizzes(category) {
      return this.quizzes
        .filter(quiz => quiz.category === category)
        .sort((a, b) => b.results.length - a.results.length);
    },
    adjustSlidesPerView() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        this.slidesPerView = 1;
        this.categorySlidesPerView = 1;
      } else if (screenWidth < 1024) {
        this.slidesPerView = 2;
        this.categorySlidesPerView = 2;
      } else if (screenWidth < 1440) {
        this.slidesPerView = 3;
        this.categorySlidesPerView = 3;
      } else {
        this.slidesPerView = 4;
        this.categorySlidesPerView = 4;
      }
    },
    checkQuery() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('query')) {
        this.query = urlParams.get('query');
        this.queryExists = true;
      } else {
        this.queryExists = false;
        this.query = '';
      }
    },
    scrollToCategory() {
      if (this.selectedCategory) {
        const categoryElement = document.getElementById(this.selectedCategory);
        if (categoryElement) {
          categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

  },
  computed: {
    filteredquizzes() {
      return this.quizzes.filter(quiz => quiz.title.toLowerCase().includes(this.query.toLowerCase())
        || quiz.category.toLowerCase().includes(this.query.toLowerCase())
        || quiz.description.toLowerCase().includes(this.query.toLowerCase())
      ).sort((a, b) => b.results.length - a.results.length);
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustSlidesPerView);
  },
  async created() {
    this.adjustSlidesPerView();
    window.addEventListener('resize', this.adjustSlidesPerView);
    this.checkQuery();
    try {
      const { posts, load } = getQuizes();
      await load();
      this.quizzes = posts.value.sort((a, b) => b.results.length - a.results.length);
    } catch (error) {
      console.error('Error loading quizzes:', error);
    }
  },
  setup() {
    return {
      modules: [Navigation, Scrollbar, A11y],
    };
  },
  watch: {
    $route(to, from) {
      this.checkQuery();
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  margin-top: 60px;
}

.quiz-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 10px;
  width:300px;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

h1 {
  color: #7600bc;
}

.back-button-container2 {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 0;
}

.back-button2 {
  background-color: #F9B115;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  position: relative;
  top: 60px
}

.filter-container {
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.filter-label {
  font-size: 1rem;
  color: #333;
}

.category-selector {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}

@media (min-width: 600px) {
  .filter-group {
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  .category-selector {
    width: auto;
  }
}


.grid-container2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

@media (min-width: 640px) {
  .grid-container2 {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-container2 {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (min-width: 1440px) {
  .grid-container2 {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}


.prev2{
  width: 100%;
  margin: 0;
}

.quiz-card2{
  width: 100%;
}

</style>
