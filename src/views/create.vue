<template>
  <div class="create-container max-w-2xl mx-auto mt-20 p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">

    <form @submit.prevent="submitQuiz">
      <div class="flex justify-between">
        <div class="w-1/3">
          <label for="quiz-title" class="block mb-2 font-semibold text-gray-700">Quiz Title:</label>
          <input type="text" id="quiz-title" v-model="quizTitle" required class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300"/>
        </div>

        <div class="w-1/3 ml-4">
          <label for="quiz-category" class="block mb-2 font-semibold text-gray-700">Category:</label>
          <select id="quiz-category" v-model="quizCategory" required class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300">
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
        </div>
        <div class="w-1/3 ml-4">
          <label for="quiz-difficulty" class="block mb-2 font-semibold text-gray-700">Difficulty:</label>
          <select id="quiz-difficulty" v-model="quizDifficulty" required class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300">
            <option value="Any Difficulty">Any Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <label for="quiz-image" class="block mb-2 font-semibold text-gray-700">Image URL:</label>
      <input type="text" id="quiz-image" v-model="quizImage" class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300"/>


      <label for="quiz-description" class="block mb-2 font-semibold text-gray-700">Description:</label>
      <textarea id="quiz-description" v-model="quizDescription" required class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300"></textarea>

      <label for="quiz-questions" class="block mb-2 font-semibold text-gray-700">Questions:</label>

      <div v-for="(question, questionKey) in questions" :key="questionKey" class="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50 transition-transform transform hover:scale-105 hover:shadow-md">
        <fieldset>
          <div class="flex items-center mb-4">
            <input type="text" :value="questionKey" @blur="updateQuestion($event.target.value, questionKey)" placeholder="Enter Question" class="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300 mr-2"/>
            <button type="button" @click="deleteQuestion(questionKey)" class="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300" style="background-color: #F9B115;">X</button>
          </div>
          <div v-for="(answer, index) in question.answers" :key="index" class="flex items-center mb-2">
            <input type="text" v-model="questions[questionKey].answers[index]" placeholder="Enter Answer" class="w-full p-2 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300"/>
            <button type="button" @click="questions[questionKey].answers.splice(index, 1)" class="ml-2 p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300" style="background-color: #F9B115;">-</button>
          </div>
          <button type="button" @click="addAnswer(questions[questionKey])" class="mt-2 mb-4 p-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-300" style="background-color: #7600bc;">+</button>
          <label class="block mb-2 font-semibold text-gray-700">Set Correct Answer:</label>
          <select v-model="questions[questionKey].correct" @change="setCorrectAnswer(questions[questionKey], $event.target.value)" required class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:border-purple-600 focus:ring focus:ring-purple-200 transition duration-300">
            <option v-for="(answer, index) in question.answers" :value="answer">{{ answer }}</option>
          </select>
        </fieldset>
      </div>

      <div class="button-container text-center mb-6">
        <button type="button" @click="addQuestion" class="mt-4 p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300">Add Question</button>
      </div>
      <div class="button-container text-center">
        <button type="submit" class="mt-4 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">Create Quiz</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getUser } from '@/firebase/Authentification/getUser';
import { addNewQuiz } from '@/firebase/Firestore/addQuiz';

export default {
  data() {
    return {
      quizTitle: '',
      quizCategory: 'Any Category',
      quizDescription: '',
      quizDifficulty: 'Any Difficulty',
      quizImage: null,
      questions: {
        'Question 1': {
          correct: '',
          answers: []
        },
      }
    };
  },
  methods: {
    addQuestion() {
      const question = `Question ${Object.keys(this.questions).length + 1}`;
      this.questions[question] = {
        correct: '',
        answers: []
      }
    },
    addAnswer(question) {
      question.answers.push('');
    },
    updateQuestion(value, key) {
      if (value === key) return;
      const question = this.questions[key];
      this.questions[value] = question;
      delete this.questions[key];
    },
    deleteQuestion(key) {
      delete this.questions[key];
    },
    submitQuiz() {
      const uid = getUser().uid;
      const data = {
        title: this.quizTitle,
        category: this.quizCategory,
        description: this.quizDescription,
        difficulty: this.quizDifficulty,
        questions: this.questions,
        imageURL: this.quizImage,
        createdBy: uid
      };
      addNewQuiz(uid, data);
      this.$router.push('/dashboard');
    },
    setCorrectAnswer(question, value) {
      question.correct = value;
    }
  }
};
</script>

<style scoped>
/* These styles can be removed as they are now covered by Tailwind CSS */
</style>
