<script setup>
import { ref, onMounted } from 'vue';
// import PostCard from '../components/PostCard.vue';
import PostCardView from '../components/PostCardView.vue';

import { useRoute } from 'vue-router';
// import { ref } from 'vue';

const postCardViewRef = ref(null);
const filter = ref('all');
const pageSize = ref(10);
const sortType = ref('time');
const searchText = ref('');

const route = useRoute();

onMounted(() => {
  if (route.params.searchText) {
    searchText.value = route.params.searchText;
    return;
  }
  if (route.params.filterType) {
    filter.value = route.params.filterType;
    return;
  }
  postCardViewRef.value.loadPosts()
});

// watch([filter, pageSize, sortType, searchText], () => {
//   this.$refs.postCardView.loadPosts();
// }, { immediate: true });
const updateFilter = (newType) => {
  filter.value = newType;
};
const updatePageSize = (newSize) => {
  pageSize.value = newSize;
};
const updateSortType = (newSort) => {
  sortType.value = newSort;
};

</script>

<template>

  <main class="container">
    <div class="d-flex justify-content-start gap-3">
      <!-- 筛选类型下拉菜单 -->
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" id="filterMenuButton" data-bs-toggle="dropdown"
          aria-expanded="false">
          Categori {{ filter }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="filterMenuButton">
          <li><a class="dropdown-item" @click="updateFilter('all')">All</a></li>
          <li><a class="dropdown-item" @click="updateFilter('sports')">Sports</a></li>
          <li><a class="dropdown-item" @click="updateFilter('music')">Music</a></li>
          <!-- more -->
        </ul>

      </div>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="pageSizeMenuButton"
          data-bs-toggle="dropdown" aria-expanded="false">
          {{ pageSize }} per page
        </button>
        <ul class="dropdown-menu" aria-labelledby="pageSizeMenuButton">
          <li><a class="dropdown-item" @click="updatePageSize(5)">5</a></li>
          <li><a class="dropdown-item" @click="updatePageSize(10)">10</a></li>
          <li><a class="dropdown-item" @click="updatePageSize(20)">20</a></li>
          <!-- more -->
        </ul>

      </div>
      <!-- 排序方式下拉菜单 -->
      <div class="dropdown">
        <button class="btn btn-info dropdown-toggle" type="button" id="sortTypeMenuButton" data-bs-toggle="dropdown"
          aria-expanded="false">
          Sort by {{ sortType }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="sortTypeMenuButton">
          <li><a class="dropdown-item" @click="updateSortType('likes')">Likes</a></li>
          <li><a class="dropdown-item" @click="updateSortType('time')">Time</a></li>
          <!-- more -->
        </ul>
      </div>
    </div>
    <br>
    <!-- PostCard组件 -->
    <!-- <PostCard v-for="post in posts" :key="post.id" :type="filter" /> -->
    <!-- <PostCard /> -->
    <!-- <PostCard :id=114514 /> -->
    <PostCardView ref="postCardViewRef" :filter="filter" :pageSize="pageSize" :sortType="sortType"
      :searchText="searchText" />

  </main>
</template>
