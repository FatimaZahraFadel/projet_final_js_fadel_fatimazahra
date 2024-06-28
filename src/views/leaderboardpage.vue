<template>
  <div class="mt-16">
    <h1 class="text-leaderboard font-bold text-3xl md:text-4xl lg:text-5xl mb-12 text-center">Leaderboard</h1>

    <div v-if="results.length" class="max-w-5xl mx-auto">
      <!-- Podium for Top 3 Users -->
      <div class="flex justify-center mb-12 space-x-2 md:space-x-4 lg:space-x-6 podium-container">
        <div v-for="(result, index) in topThree" :key="result.user" class="podium text-center">
          <div :class="['podium-step', medalColor(index), podiumClass(index)]">
            <div class="podium-rank text-2xl md:text-3xl lg:text-4xl">{{ getMedalIcon(index) }}</div>
            <div class="podium-user text-lg md:text-xl lg:text-2xl font-bold">
              <router-link :to="'/profile/' + result.user" class="font-semibold hover:underline">
                {{ result.username }}
              </router-link>
            </div>
            <div class="text-white podium-score text-md md:text-lg lg:text-xl text-highlight">{{ result.score }}</div>
          </div>
        </div>
      </div>

      <!-- Table for Remaining Users -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <thead>
            <tr class="table-header-row">
              <th class="px-4 py-2 text-left">Rank</th>
              <th class="px-4 py-2 text-left">User</th>
              <th class="px-4 py-2 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in remainingUsers" :key="result.user" class="table-row hover:bg-gray-100">
              <td class="border px-4 py-2">{{ index + 4 }}</td>
              <td class="border px-4 py-2">
                <router-link :to="'/profile/' + result.user" class="font-semibold hover:underline">
                  {{ result.username }}
                </router-link>
              </td>
              <td class="border px-4 py-2">{{ result.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="text-center text-secondary">
      No results available.
    </div>
  </div>
</template>

<style scoped>
/* Text Colors */
.text-primary {
  color: #7600bc;
}
.text-secondary {
  color: #9381FF;
}
.text-link {
  color: #7600bc;
}
.text-hover-link {
  color: #f9b115;
}
.text-highlight {
  color: #f9b115;
}

/* New styles for leaderboard title and table header row */
.text-leaderboard {
  color: #7600bc;
}

.table-header-row {
  background-color: #F9B115;
}

.table-header-row th {
  color: white;
}

/* Podium Styles */
.podium-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 10px; /* Spacing between podium cards */
}

.podium {
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.podium-step {
  background: #fff;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 200px;
}

.podium-step:hover {
  transform: translateY(-10px);
}
.podium-rank {
  font-size: 1.75rem;
  font-weight: bold;
}
.podium-user {
  font-size: 1rem;
  margin: 10px 0;
}
.podium-score {
  font-size: 0.875rem;
}

/* Podium Colors */
.bg-gold {
  background-color: #ffd700;
}
.bg-silver {
  background-color: #c0c0c0;
}
.bg-bronze {
  background-color: #cd7f32;
}

/* Specific Podium Positions */
.first {
  transform: translateY(-30px);
}
.second {
  transform: translateY(-10px);
}
.third {
  transform: translateY(0px);
}

/* Table Styles */
.table-auto {
  width: 100%;
  border-collapse: collapse;
}
.table-auto th,
.table-auto td {
  border: 1px solid #7600bc;
  padding: 10px;
}
.table-auto th {
  background-color: #7600bc;
  color: white;
  text-align: left;
}
.table-row:hover {
  background-color: #f0f0f0;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.podium-step {
  animation: fadeInUp 0.6s ease-in-out;
}
.table-row {
  animation: fadeInUp 0.4s ease-in-out;
}

/* Media Queries for Responsive Design */
@media (min-width: 640px) {
  .podium-container {
    gap: 20px;
  }
  .podium-step {
    padding: 25px;
  }
  .podium-rank {
    font-size: 1.5rem;
  }
  .podium-user {
    font-size: 1rem;
  }
  .podium-score {
    font-size: 0.875rem;
}
}

@media (min-width: 768px) {
  .podium {
    width: 150px;
  }
  .podium-step {
    padding: 30px;
  }
  .podium-rank {
    font-size: 1.75rem;
  }
  .podium-user {
    font-size: 1.25rem;
  }
  .podium-score {
    font-size: 1rem;
}
}

@media (min-width: 1024px) {
  .podium {
    width: 150px;
  }
  .podium-step {
    padding: 30px;
  }
  .podium-rank {
    font-size: 2rem;
  }
  .podium-user {
    font-size: 1.25rem;
  }
  .podium-score {
    font-size: 1rem;
}
}
</style>

<script>
import { getQuizes } from '@/firebase/Firestore/getQuiz';
import { getUserById } from '@/firebase/Authentification/getUser';

export default {
  name: 'Leaderboard',
  data() {
    return {
      results: [],
    };
  },
  computed: {
    topThree() {
      const topThreeResults = [...this.results];
      if (topThreeResults.length >= 2) {
        [topThreeResults[0], topThreeResults[1]] = [topThreeResults[1], topThreeResults[0]];
      }
      return topThreeResults.slice(0, 3);
    },
    remainingUsers() {
      return this.results.slice(3);
    },
  },
  methods: {
    medalColor(index) {
      if (index === 0) return 'bg-silver';
      if (index === 1) return 'bg-gold';
      if (index === 2) return 'bg-bronze';
      return 'bg-regular';
    },
    podiumClass(index) {
      if (index === 0) return 'second';
      if (index === 1) return 'first';
      if (index === 2) return 'third';
      return '';
    },
    getMedalIcon(index) {
      if (index === 0) return '🥈';
      if (index === 1) return '🥇';
      if (index === 2) return '🥉';
      return '';
    },
  },
  async created() {
    const { posts, error, load } = await getQuizes();
    await load();
    const quizes = posts.value;

    quizes.forEach(quiz => {
      quiz.results.forEach(result => {
        const existingResult = this.results.find(r => r.user === result.user);
        if (existingResult) {
          existingResult.score += result.score;
        } else {
          this.results.push({ user: result.user, score: result.score });
        }
      });
    });

    this.results.map(async result => {
      const user = await getUserById(result.user);
      result.username = user.displayName;
    });
    this.results.sort((a, b) => b.score - a.score);
  },
};
</script>
