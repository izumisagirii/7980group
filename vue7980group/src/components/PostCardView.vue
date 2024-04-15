<template>
    <div>
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" aria-label="Previous" @click="changePage(currentPage - 1)">
                        <span aria-hidden="true">«</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                    <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" aria-label="Next" @click="changePage(currentPage + 1)">
                        <span aria-hidden="true">»</span>
                    </a>
                </li>
            </ul>
        </nav>

        <div v-for="post in paginatedPosts" :key="post._id">
            <PostCard :id="post._id" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import PostCard from './PostCard.vue';

// props
const props = defineProps({
    filter: String,
    pageSize: Number,
    sortType: String
});

// 帖子数据的响应式引用
const posts = ref([{
    "_id": 1
}, {
    "_id": 2
}, {
    "_id": 3
}, {
    "_id": 4
}, {
    "_id": 5
}, {
    "_id": 6
}, {
    "_id": 7
}, {
    "_id": 8
}, {
    "_id": 9
}, {
    "_id": 10
}, {
    "_id": 11
}, {
    "_id": 12
}, {
    "_id": 13
}, {
    "_id": 14
}, {
    "_id": 15
}, {
    "_id": 16
}, {
    "_id": 17
}, {
    "_id": 18
}, {
    "_id": 19
}, {
    "_id": 20
}, {
    "_id": 21
}, {
    "_id": 22
}, {
    "_id": 23
}, {
    "_id": 24
}, {
    "_id": 25
}, {
    "_id": 26
}, {
    "_id": 27
}, {
    "_id": 28
}, {
    "_id": 29
}, {
    "_id": 30
}]);


const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(posts.value.length / props.pageSize));

// 监听filter和sortType的变化
watch([props.filter, props.sortType], () => {
    // 当filter或sortType变化时，重新加载帖子
    console.log('Loading posts with', filter.value, pageSize.value, sortType.value);
    loadPosts();
});


const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * props.pageSize;
    const end = start + props.pageSize;
    return posts.value.slice(start, end);
});


const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
        currentPage.value = newPage;
    }
};

// 加载帖子的方法
const loadPosts = async () => {
    try {
        // 使用fetch发送GET请求到后端API
        // const response = await fetch('/api/posts?' + new URLSearchParams({
        //     filter: props.filter,
        //     sortType: props.sortType,
        // }));
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        // const data = await response.json();
        // posts.value = data;
    } catch (error) {
        console.error('Failed to load posts:', error);
    }
};

onMounted(loadPosts);
</script>
