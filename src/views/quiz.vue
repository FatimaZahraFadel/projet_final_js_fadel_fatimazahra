<template>
  <div v-if="quiz" class="min-h-screen flex mt-10 items-center justify-center bg-light-purple p-6">
    <div class="max-w-4xl w-full bg-white rounded-lg shadow-md p-8 md:p-12 lg:p-16 overflow-y-auto" style="width: 90%; height: auto; max-height: 90vh;">
      <h1 class="text-4xl font-bold mb-8 text-dark-purple text-center">{{ quiz.title }}</h1>
      <div v-if="showResults" class="results-container text-center overflow-auto">
        <h2 class="text-3xl font-semibold mb-6 text-dark-purple">Your Results</h2>
        <h3 class="text-4xl  font-bold  text-gray-800 mb-4">You scored {{ finalScore }} out of {{ quizQuestions.length }}</h3>
        
        <CProgress class="mb-10" :height="20"
        :color="finalScore === quizQuestions.length ? 'success' : 'warning'" 
        :value="(finalScore / quizQuestions.length) * 100" />
        
          <div v-for="(question, index) in quizQuestions" :key="index" class="mb-8 text-left border-b pb-4">
            <h3 class="text-xl font-bold mb-2">{{ index + 1 }}. {{ currentQuestionText2(index) }}</h3>
            <p :class="{'text-green-600': selectedAnswers[index] === question.correct, 'text-red-600': selectedAnswers[index] !== question.correct}" class="mb-2 font-bold">
              Your answer: {{ selectedAnswers[index] }}
            </p>
            <p class="text-blue-600 mb-2 font-bold">Correct answer: {{ question.correct }}</p>
          </div>

          <button class="take-quiz-btn mt-8 inline-block px-12 py-3 bg-dark-yellow text-white rounded hover:bg-dark-yellow-dark"  @click="goBack">Back</button>
        </div>

      <div v-else-if="quizQuestions[currentQuestionIndex]" class="question-container">
        <h2 class="text-3xl font-semibold mb-6 text-dark-purple text-center">{{ currentQuestionText }}</h2>
        <div class="answers-container grid gap-4">
          <div v-for="(answer, index) in quizQuestions[currentQuestionIndex].answers" :key="index" class="mb-2">
            <label 
              class="inline-flex items-center justify-between w-full p-4 bg-light-purple rounded-lg shadow-md cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-lg"
              :class="{
                'bg-green-200': selectedAnswers[currentQuestionIndex] === answer && answer === quizQuestions[currentQuestionIndex].correct, 
                'bg-red-200': selectedAnswers[currentQuestionIndex] === answer && answer !== quizQuestions[currentQuestionIndex].correct
              }"
            >
              <input 
                type="radio" 
                :name="'question-' + currentQuestionIndex" 
                :value="answer" 
                v-model="selectedAnswers[currentQuestionIndex]" 
                class="form-radio h-5 w-5 text-purple-600"
                @change="giveFeedback(currentQuestionIndex, answer)"
                :disabled="isAnswered[currentQuestionIndex]"
              >
              <span class="ml-4 text-gray-700 text-lg">{{ answer }}</span>
            </label>
          </div>
        </div>
      </div>

      <div v-if="!showResults" class="mt-8 flex justify-end">
        <button v-if="currentQuestionIndex < quizQuestions.length - 1" @click="nextQuestion" class="inline-block px-8 py-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition duration-300">Next</button>
        <button v-if="currentQuestionIndex === quizQuestions.length - 1" @click="submitQuiz" class="inline-block px-8 py-4 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition duration-300">Submit Quiz</button>
      </div>
    </div>
  </div>
</template>

<script>
import { CProgress } from '@coreui/vue';
import { getQuiz } from '@/firebase/Firestore/getQuiz';
import { appendScoreToQuiz, updateScoreToQuiz } from '@/firebase/Firestore/addQuiz';
import { getUser, getUserById } from '@/firebase/Authentification/getUser';

export default {
  name: 'TakeQuiz',
  components: {
    CProgress
  },
  data() {
    return {
      quiz: null,
      currentQuestionIndex: 0,
      selectedAnswers: [],
      isAnswered: [],
      showResults: false,
      finalScore: 0,
      quizTaken: false
    };
  },
  async created() {
    const quizId = this.$route.params.id;
    this.quiz = await getQuiz(quizId);
    this.initializeSelectedAnswers();

    const usera = await getUser();
    const user = await getUserById(usera.uid);

    if (user.quizzes && user.quizzes.some(quiz => quiz.quizId === this.quiz.id )) {
      this.quizTaken = true;
    }
  },
  computed: {
    quizQuestions() {
      return this.quiz ? Object.values(this.quiz.questions) : [];
    },
    currentQuestionText() {
      return this.quiz ? Object.keys(this.quiz.questions)[this.currentQuestionIndex] : '';
    }
  },
  methods: {
    currentQuestionText2(index) {
      return this.quiz ? Object.keys(this.quiz.questions)[index] : '';
    },
    initializeSelectedAnswers() {
      if (this.quiz) {
        this.selectedAnswers = new Array(Object.keys(this.quiz.questions).length).fill(null);
        this.isAnswered = new Array(Object.keys(this.quiz.questions).length).fill(false);
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    giveFeedback(questionIndex, answer) {
      if (!this.isAnswered[questionIndex]) {
        this.isAnswered[questionIndex] = true;
        if (answer === this.quizQuestions[questionIndex].correct) {
          this.selectedAnswers[questionIndex] = answer;
        } else {
          this.selectedAnswers[questionIndex] = answer;
        }
      }
    },
    submitQuiz() {
      this.calculateScore();
      this.showResults = true;
      const user = getUser();

      if (this.quizTaken){
        updateScoreToQuiz(this.quiz.id, user.uid, this.finalScore);
      } else {
        appendScoreToQuiz(this.quiz.id, user.uid, this.finalScore);
      }
    },
    calculateScore() {
      let score = 0;
      this.quizQuestions.forEach((question, index) => {
        const correctAnswer = question.correct;
        if (this.selectedAnswers[index] === correctAnswer) {
          score++;
        }
      });
      this.finalScore = score;
    },
    goBack() {
      this.$router.push('/quizdetails/' + this.quiz.id);
    }
  }
};
</script>

<style scoped>
/* Custom styles */
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

.text-green-600 {
  color: #38a169; /* Tailwind CSS color for green */
}

.text-red-600 {
  color: #e53e3e; /* Tailwind CSS color for red */
}

.text-blue-600 {
  color: #3182ce; /* Tailwind CSS color for blue */
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
}

.mb-8 {
  margin-bottom: 2rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.p-6 {
  padding: 1.5rem;
}

.p-8 {
  padding: 2rem;
}

.md\:p-12 {
  padding: 3rem;
}

.lg\:p-16 {
  padding: 4rem;
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

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.bg-green-200 {
  background-color: #c6f6d5; /* Tailwind CSS color for light green */
}

.bg-red-200 {
  background-color: #fed7d7; /* Tailwind CSS color for light red */
}

/* Add overflow styling */
.overflow-y-auto {
  overflow-y: auto;
}

/* Media Queries */
@media screen and (max-width: 768px) {
  .max-w-4xl {
    width: 90%;
  }
}

@media screen and (max-width: 480px) {
  .p-6 {
    padding: 1.5rem;
  }
}
</style>
