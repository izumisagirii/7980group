<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { defineProps } from 'vue';

const props = defineProps({
  section: Object
});

const getImageUrl = (imagePath) => {
  return new URL(`../assets/${imagePath}`, import.meta.url).href;
};

</script>

<!-- <template>
  <main>
    <TheWelcome />
  </main>
</template> -->

<template>
  <section class="container">
    <!-- <TheWelcome /> -->
    <div v-if="userName">
      <h1>Welcome, {{ userName }}!</h1>
    </div>
    <div v-else>
      <h1>Welcome to our forum!</h1>
      <p>Please <a href="/login">log in</a> to continue.</p>
    </div>
    <div class="row">
      <!-- card -->
      <div class="col-lg-4 col-md-4 col-sm-12 mb-4" v-for="section in sections" :key="section.id">
        <div class="card h-100 animate-entry">
          <!-- Logo -->
          <div class="card-header text-center">
            <img :src="getImageUrl(section.logoSrc)" alt="Logo" class="logo-img">
          </div>
          <img :src="getImageUrl(section.imageSrc)" class="card-img-top" alt="Section Image">
          <div class="card-body">
            <h5 class="card-title">{{ section.title }}</h5>
            <p class="card-text">{{ section.description }}</p>
            <!--href -->
            <a :href="section.href" class="btn btn-primary">enter</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ForumEntrance',
  data() {
    return {
      userName: localStorage.getItem('name'),
      sections: [
        {
          id: 1,
          title: 'Music & Harmony',
          description: 'Harmonize Your Soul',
          logoSrc: 'images/MusicalNote.svg',
          imageSrc: 'pics/pexels-jorge-fakhouri-filho-2701570.jpg',
          href: '/browse/music',
        },
        {
          id: 2,
          title: 'Sports & Vitality',
          description: 'Champion Your Spirit',
          logoSrc: 'images/Trophy.svg',
          imageSrc: 'pics/pexels-pixabay-262524.jpg',
          href: '/browse/sports',
        },
        {
          id: 3,
          title: 'Science & Tech',
          description: 'Innovate and Illuminate',
          logoSrc: 'images/Beaker.svg',
          imageSrc: 'pics/pexels-lukas-590022.jpg',
          href: '/browse/science',
        },
        {
          id: 4,
          title: 'Literature & Arts',
          description: 'Where Creativity Meets Legacy',
          logoSrc: 'images/BookOpen.svg',
          imageSrc: 'pics/pexels-pixabay-256455.jpg',
          href: '/browse/literature',
        },
        {
          id: 5,
          title: 'Food & Cuisine',
          description: 'Taste the Conversation',
          logoSrc: 'images/Cake.svg',
          imageSrc: 'pics/pexels-nadin-sh-20844845.jpg',
          href: '/browse/food',
        },
        {
          id: 6,
          title: 'Travel & Adventure',
          description: 'Embark on the Quest of Curiosity',
          logoSrc: 'images/Camera.svg',
          imageSrc: 'pics/pexels-harry-shum-6752597.jpg',
          href: '/browse/travel',
        },
        // other card
      ],
    };
  },

};
</script>

<style>
.logo-img {
  width: 50px;
  height: auto;
}

.card-img-top {
  height: 180px;
  object-fit: cover;
}

.animate-entry {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
