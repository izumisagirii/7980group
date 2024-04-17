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
import { ref, computed, watch, onMounted, defineProps, defineExpose } from 'vue';
import { useRoute } from 'vue-router';
// import { expose } from 'vue';
import PostCard from './PostCard.vue';


const props = defineProps({
    filter: String,
    pageSize: Number,
    sortType: String,
    searchText: String
});



const posts = ref([
]);


const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(posts.value.length / props.pageSize));

watch(() => [props.filter, props.sortType, props.searchText], () => {
    console.log('reload!')
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


const loadPosts = async () => {
    try {
        const token = localStorage.getItem('token_my');
        const response = await fetch('/api/posts?' + new URLSearchParams({
            filter: props.filter,
            sortType: props.sortType,
            searchText: props.searchText,
        }), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        posts.value = data;
    } catch (error) {
        console.error('Failed to load posts:', error);
    }
};
defineExpose({
    loadPosts
});


// PostCardView.vue
// onMounted(loadPosts);
</script>
