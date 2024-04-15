<script setup>
import { ref, onMounted } from 'vue';
import PostCard from '../components/PostCard.vue';
import PostCardView from '../components/PostCardView.vue';

import { useRoute } from 'vue-router';

// 定义筛选类型、每页显示条数和排序方式的响应式变量
const filter = ref('all');
const pageSize = ref(10);
const sortType = ref('time');

const route = useRoute();
onMounted(() => {
  if (route.params.filterType) {
    filter.value = route.params.filterType;
  }
});


const updateFilter = (newType) => {
  filter.value = newType;
  // updateView();
};
const updatePageSize = (newSize) => {
  pageSize.value = newSize;
  // updateView();
};
const updateSortType = (newSort) => {
  sortType.value = newSort;
  // updateView();
};

// const updateView = () => {

//   // 根据当前的filter, pageSize, 和 sortType来获取数据
//   console.log('Loading posts with', filter.value, pageSize.value, sortType.value);
//   //更新postcardview
// };
</script>

<template>

  <main class="container">
    <!-- 使用Bootstrap的行和列来创建响应式布局 -->
    <div class="d-flex justify-content-start gap-3">
      <!-- 筛选类型下拉菜单 -->
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" id="filterMenuButton" data-bs-toggle="dropdown"
          aria-expanded="false">
          Categori {{ filter }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="filterMenuButton">
          <li><a class="dropdown-item" href="#" @click="updateFilter('all')">All</a></li>
          <li><a class="dropdown-item" href="#" @click="updateFilter('sports')">Sports</a></li>
          <li><a class="dropdown-item" href="#" @click="updateFilter('music')">Music</a></li>
          <!-- more -->
        </ul>

      </div>
      <!-- 每页显示条数下拉菜单 -->
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="pageSizeMenuButton"
          data-bs-toggle="dropdown" aria-expanded="false">
          {{ pageSize }} per page
        </button>
        <ul class="dropdown-menu" aria-labelledby="pageSizeMenuButton">
          <li><a class="dropdown-item" href="#" @click="updatePageSize(5)">5</a></li>
          <li><a class="dropdown-item" href="#" @click="updatePageSize(10)">10</a></li>
          <li><a class="dropdown-item" href="#" @click="updatePageSize(20)">20</a></li>
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
          <li><a class="dropdown-item" href="#" @click="updateSortType('likes')">Likes</a></li>
          <li><a class="dropdown-item" href="#" @click="updateSortType('time')">Time</a></li>
          <!-- more -->
        </ul>
      </div>
    </div>
    <br>
    <!-- PostCard组件 -->
    <!-- <PostCard v-for="post in posts" :key="post.id" :type="filter" /> -->
    <!-- <PostCard /> -->
    <!-- <PostCard :id=114514 /> -->
    <PostCardView :filter="filter" :pageSize="pageSize" :sortType="sortType" />
  </main>
</template>
