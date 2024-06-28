<template>
  <router-link v-if="quizzy" :to="'/quizdetails/' + quizId">
    <CCard class="main bg-white shadow m-4 transition-transform duration-300 hover:-translate-y-1">
      <CCardImage v-if="imagelink" orientation="top" :src="imagelink" class="sizefixed h-48 w-full" />
      <CCardBody class="flex flex-col justify-between p-4">
        <CCardTitle class="text-lg font-semibold">{{ truncatedTitle }}</CCardTitle>
        <div v-if="!isAdmin" class="mt-2">
          <CCardText class="text-sm text-gray-700">{{ truncatedDescription }}</CCardText>
          <p class="text-xs text-[#F9B115] mt-1">{{ quizzy.category }} | {{ quizzy.difficulty }}</p>
          <p class="quiz-details mt-2 text-gray-600 text-center">Score: {{ score }}/{{ Object.keys(quizzy.questions).length }}</p>
        </div>
      </CCardBody>
    </CCard>
  </router-link>
</template>

<script>
import { getQuiz } from '@/firebase/Firestore/getQuiz';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/vue';

export default {
  components: {
    CCard,
    CCardImage,
    CCardBody,
    CCardTitle,
    CCardText,
    CButton
  },
  props: {
    quiz: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      quizzy: null,
      imagelink: null,
      score: this.quiz.score,
      loaded: false,
    };
  },
  computed: {
    truncatedTitle() {
      return this.quizzy.title.length > 15 ? this.quizzy.title.slice(0, 15) + '...' : this.quizzy.title;
    },
    truncatedDescription() {
      return this.quizzy.description.length > 20 ? this.quizzy.description.slice(0, 20) + '...' : this.quizzy.description;
    }
  },
  async mounted() {
    this.quizId = this.quiz.quizId;
    this.score = this.quiz.score;

    if (!this.quizId) {
      return;
    }
    const data = await getQuiz(this.quizId);
    this.quizzy = data;

    if (data == null) {
      return;
    }

    if (this.quizzy.imageURL != null && this.quizzy != '') {
      this.imagelink = this.quizzy.imageURL;
    } else {
      this.imagelink = "https://coreui.io/vue/docs/images/vue.jpg";
    }
    this.loaded = true;
  }
};
</script>

<style scoped>
.main {
  min-width: 200px;
}
.sizefixed{
  height: 180px;
  object-fit: cover;
}
</style>
