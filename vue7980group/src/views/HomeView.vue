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
      sections: [
        {
          id: 1,
          title: 'music',
          description: 'test music text zsbdzsbd',
          logoSrc: 'images/music.svg',
          imageSrc: 'pics/pexels-jorge-fakhouri-filho-2701570.jpg',
          href: '/browse/music',
        },
        {
          id: 1,
          title: 'music',
          description: 'test music text zsbdzsbd',
          logoSrc: 'images/music.svg',
          imageSrc: 'pics/pexels-jorge-fakhouri-filho-2701570.jpg',
          href: '/browse/music',
        },
        {
          id: 1,
          title: 'music',
          description: 'test music text zsbdzsbd',
          logoSrc: 'images/music.svg',
          imageSrc: 'pics/pexels-jorge-fakhouri-filho-2701570.jpg',
          href: '/browse/music',
        },
        {
          id: 2,
          title: 'sports',
          description: 'test sports text zsbdzsbd',
          logoSrc: 'images/sports.svg',
          imageSrc: 'pics/pexels-lukas-590022.jpg',
          href: '/browse/sports',
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
