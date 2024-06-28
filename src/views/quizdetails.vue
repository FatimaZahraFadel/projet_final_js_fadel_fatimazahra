<template>
  <div v-if="quiz" class="min-h-screen flex mt-10 items-center justify-center bg-light-purple p-6">
    <div class="max-w-4xl w-full bg-white rounded-lg shadow-md p-8 md:p-12 lg:p-16" id="parent">
      <div class="flex mb-8">
        <div class="left ">
          <img :src="quiz.imageURL" alt="Quiz Image" class="rounded-lg shadow-md"  width="500px"/>
        </div>
        <div class="right ">
          <h1 class="text-4xl mt-4 font-bold mb-4 text-dark-purple">{{ quiz.title }}</h1>
          <p class="text-gray-700 mb-4 text-lg">Category: <span class="font-semibold">{{ quiz.category }}</span></p>
          <p class="text-gray-700 mb-4 text-lg">Number of Questions: <span class="font-semibold">{{ Object.keys(quiz.questions).length }}</span></p>
        </div>
      </div>
      <div class="mt-8">
        <CTabs activeItemKey="description">
          <CTabList variant="underline">
            <CTab itemKey="description">Description</CTab>
            <CTab itemKey="leaderboard">Leaderboard</CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel class="p-6" itemKey="description">
              <h2 class="text-3xl font-semibold mb-4">Quiz Description</h2>
              <p class="text-gray-800 text-lg">{{ quiz.description }}</p>
            </CTabPanel>
            <CTabPanel class="p-6" itemKey="leaderboard">
              <h2 class="text-3xl font-semibold mb-4">Leaderboard</h2>
              <ul class="text-lg">
                
                <table class="min-w-full divide-y divide-gray-200">
                  <tbody class="bg-white divide-y divide-gray-200">
                    <template v-for="(result, index)  in sortedLeaderboard"  :key="index">
                      <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flexch items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                              <span v-if="index < 3" class="medal-icon">{{ getMedalIcon(index) }}</span>
                              <span v-else>{{ index + 1 }}</span>
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900"> 
                                <span :class="getMedalClass(index)"> 
                                  <router-link :to="'/profile/' + result.user" class="hover:underline"> {{ result.username }} </router-link> 
                                </span> 
                              </div>
                              <div class="text-sm text-gray-500">{{ result.score }}</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </ul>
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </div>
      <button @click="backhome" class="take-quiz-btn mt-8 inline-block px-12 py-3 bg-dark-yellow text-white rounded hover:bg-dark-yellow-dark">Back</button>
      <router-link :to="'/take/' + quiz.id" class="take-quiz-btn mt-4 ml-4 inline-block px-9 py-3 bg-purple-600 text-white rounded hover:bg-purple-700">Take Quiz</router-link>
    </div>
  </div>
</template>


<script>
import { CTabs, CTabList, CTab, CTabContent, CTabPanel } from '@coreui/vue';
import { getQuiz } from '@/firebase/Firestore/getQuiz';
import { getUserById, getUser } from '@/firebase/Authentification/getUser';

export default {
  name: 'QuizDetails',
  components: {
    CTabs,
    CTabList,
    CTab,
    CTabContent,
    CTabPanel
  },
  data() {
    return {
      quiz: null,
    };
  },
  async created() {
    this.quiz = await getQuiz(this.$route.params.id);
  },
  computed: {
    sortedLeaderboard() {
      if (this.quiz && this.quiz.results) {
        const arr = [...this.quiz.results].sort((a, b) => b.score - a.score);
        arr.forEach(element => {
           getUserById(element.user).then(
            user => {
              element.username = user.displayName;
            }
          )
        });
        return arr;
      }
      return [];
    }
  },
  methods: {
    getMedalClass(index) {
      if (index === 0) return 'text-gold font-bold';
      if (index === 1) return 'text-silver font-semibold';
      if (index === 2) return 'text-bronze font-medium';
      return '';
    },
    getMedalIcon(index) {
      if (index === 0) return '🥇';
      if (index === 1) return '🥈';
      if (index === 2) return '🥉';
      return '';
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

.text-gold {
  color: #F9B115;
}

.text-silver {
  color: #C0C0C0;
}

.text-bronze {
  color: #CD7F32;
}

.medal-icon {
  margin-right: 0.5rem;
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

.devider {
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #d3d3d3;
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

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
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

.font-medium {
  font-weight: 500;
}

.left{
  width: 100%;
}

.right {
  width: 100%;
}

.pl-8 {
  padding-left: 2rem;
  
}

.p-6 {
  padding: 1.5rem;
  margin-right: 50px;
  
}

.p-8 {
  padding: 2rem;
}

.flex {
  display: flex;
}

.flexch {
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

/* Media Queries */
@media screen and (max-width: 1024px) {
  .flex {
    flex-direction: column;
  }
  
  .left,
  .right {
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
  .medal-icon {
    margin-right: 0.5rem; 
    margin-top: -0.1rem; 
  }

  .ml-4 {
      margin-left: 0.5rem; 
  }
  .take-quiz-btn,
  .back-btn {
      padding: 8px 10px; 
      font-size: 14px; 
  }

}
</style>
