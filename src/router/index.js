import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/home.vue';
import AuthView from '../views/auth.vue';
import Browse from '../views/browse.vue';
import ProfileView from '../views/profile.vue'; 
import QuizDetails from '../views/quizdetails.vue';
import DashboardView from '../views/dashboard.vue';
import Create from '../views/create.vue';
import Edit from '../views/edit.vue';
import Leaderboard from '../views/leaderboardpage.vue';
import Quiz from '../views/quiz.vue';

import { isLogged, waitForAuthInit, getUserById, getUser } from '@/firebase/Authentification/getUser'; 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: AuthView,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/take/:id',
      name: 'Quiz',
      component: Quiz,
      meta: { requiresAuth: true }
    },
    {
      path: '/quizdetails/:id',
      name: 'QuizDetails',
      component: QuizDetails,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/browse',
      name: 'Browse',
      component: Browse,
      meta: { requiresAuth: true }
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  waitForAuthInit().then(() => {
    const isAuthenticated = isLogged();

    if (isAuthenticated && requiresAuth && to.meta.requiresAdmin) {
      getUserById(getUser().uid).then(
        (user) => {
          if (!user.isAdmin){
            next({ path: '/' });
          }
          else{
            next();
          }
        }
      );
    }
    else if (requiresAuth && !isAuthenticated) {
      next({ path: '/auth' });
    }
    else {
      next();
    }

  });
});

export default router;
