<template>
<div class="min-h-screen bg-gray-100">

    <main>
    <section class="bg-gradient-to-r from-[#7600bc] to-[#F9B115] text-white text-center py-20">
        <h1 class="text-5xl font-bold mb-4">Welcome to quizzy!</h1>
        <p class="text-xl mb-8">Test your knowledge and challenge friends with fun quizzes</p>
        <router-link to="/browse" class="bg-white text-purple-700 font-bold py-2 px-4 rounded-full">Get Started</router-link>
    </section>
    <section class="py-16">
        <h2 class="text-3xl font-bold text-center mb-8">Featured Quizzes</h2>
        <div class="max-w-6xl mx-auto">
            <swiper
                :modules="modules"
                :slides-per-view="slidesPerView"
                space-between=30
                navigation loop
                :autoplay="{ delay: 2500, disableOnInteraction: false }"
                centered-slides
                class="mySwiper" v-if="quizzes.length > 0"
            >
                <swiper-slide
                v-for="quiz in quizzes"
                :key="quiz.id"
                class="bg-white shadow-md rounded-lg p-6"
                >
                    <router-link :to="'/quizdetails/' + quiz.id">
                        <img :src="quiz.imageURL" :alt="quiz.title" class="rounded-lg mb-4" />
                        <h3 class="text-xl font-bold mb-2">{{ quiz.title }}</h3>
                        <p class="text-gray-700">{{ quiz.description }}</p>
                    </router-link>
                </swiper-slide>
            </swiper>
        </div>
    </section>

    <section class="bg-gray-200 py-16">
        <h2 class="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
            <div class="text-purple-700 text-6xl mb-4">1</div>
            <h3 class="text-xl font-bold mb-2">Sign Up</h3>
            <p class="text-gray-700">Create an account in seconds.</p>
        </div>
        <div>
            <div class="text-purple-700 text-6xl mb-4">2</div>
            <h3 class="text-xl font-bold mb-2">Choose a Quiz</h3>
            <p class="text-gray-700">Pick from a wide range of topics.</p>
        </div>
        <div>
            <div class="text-purple-700 text-6xl mb-4">3</div>
            <h3 class="text-xl font-bold mb-2">Challenge Friends</h3>
            <p class="text-gray-700">Invite friends and see who climbs the leaderboard!</p>
        </div>
        </div>
    </section>

    <section class="py-16">
        <h2 class="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div class="max-w-4xl mx-auto space-y-8">
        <div class="bg-white shadow-md rounded-lg p-6">
            <p class="text-gray-700 mb-4">"This app is amazing! I've learned so much."</p>
            <div class="flex items-center">
            <img src="https://img.freepik.com/free-photo/happy-business-man-standing-smiling-against-red-wall_155003-9367.jpg?w=360&t=st=1718111414~exp=1718112014~hmac=d8fdc81d5adb13675bfca7201a6c108e1b363121b72a9696f9b97dfb9ab77ed0"
                alt="John Waterson" class="w-10 h-10 rounded-full mr-4">
            <div>
                <h4 class="text-lg font-bold">John Waterson</h4>
            </div>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-lg p-6">
            <p class="text-gray-700 mb-4">"Great way to challenge my friends."</p>
            <div class="flex items-center">
            <img src="https://img.freepik.com/free-photo/handsome-sensitive-red-head-man-smiling_23-2149509819.jpg?w=360&t=st=1718111830~exp=1718112430~hmac=3166e25569d30910923037a0b3d3285d1c3e148ad07198a8a215517bcae33558" 
                alt="Albin Karlson" class="w-10 h-10 rounded-full mr-4">
            <div>
                <h4 class="text-lg font-bold">Albin Karlson</h4>
            </div>
            </div>
        </div>
        </div>
    </section>
    </main>
</div>

<PageFooter/>
</template>

<script>
import PageFooter from '@/components/Footer.vue';
import { getQuizes } from '@/firebase/Firestore/getQuiz';

import { Autoplay, Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar'

export default {
    name: 'HomePage',
    components: {
        PageFooter,
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            quizzes: [],
            slidesPerView: 3,
        };
    },
    setup() {
        return {
            modules: [Navigation, Scrollbar, A11y, Autoplay],
        };
    },
    methods:{
        adjustSlidesPerView() {
            if (window.innerWidth < 600) {
                this.slidesPerView = 1;
            }
            else if (window.innerWidth < 1000) {
                this.slidesPerView = 3;
            } else {
                this.slidesPerView = 4;
            }
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.adjustSlidesPerView);
    },
    async created(){
        this.adjustSlidesPerView();
        window.addEventListener('resize', this.adjustSlidesPerView);
        const {posts, error, load} = getQuizes();
        await load();
        this.quizzes = posts.value;
        this.quizzes = this.quizzes.sort((a, b) => b.results.length - a.results.length);
    }
}
</script>

<style scoped>
    .swiper-slide:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        border: 2px solid rgba(0, 0, 0, 0.5);
    }
    .swiper-slide{
        height: 350px
    }
    .swiper-slide img{
        height: 150px;
        width: 100%;
        object-fit: cover;
    }
</style>