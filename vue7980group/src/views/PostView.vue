<template>
    <main class="container">
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h6 class="card-subtitle mb-2 text-muted">Posted by: {{ post.author }}</h6>
                    <span v-if="post.likesCount" class="likes-count">{{ post.likesCount }} Likes</span>
                </div>
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.summary }}</p>

                <div class="d-flex justify-content-between">
                    <div class="text-muted">
                        Posted on: {{ post.publishDate }}
                    </div>
                    <button type="button" :class="['btn', post.liked ? 'btn-danger' : 'btn-secondary']"
                        @click="likePost">
                        {{ post.likeButtonText }}
                    </button>
                </div>
            </div>
        </div>
        <ReplyCard :id="postId" />
        <ReplyCards :id="postId" />
    </main>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ReplyCard from '../components/ReplyCard.vue';
import ReplyCards from '../components/ReplyCards.vue';

// const postId = ref('0');

// const route = useRoute();
// onMounted(() => {
//     if (route.params.postId) {
//         postId.value = route.params.postId;
//     }
// });


</script>
<script>
export default {
    name: 'PostView',
    data() {
        return {
            postId: '0',
            post: {
                author: '',
                title: '',
                summary: '',
                liked: false,
                likeButtonText: '',
                likesCount: 0,
                publishDate: '',
            },
        };
    },
    created() {
        const route = useRoute();
        this.postId = route.params.postId;
        this.fetchPostData();
    },
    methods: {
        fetchPostData() {
            const senderName = localStorage.getItem('name');
            const token = localStorage.getItem('token_my');
            fetch(`/api/post/${this.postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server response not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.post = {
                        author: data.senderName,
                        title: data.title,
                        summary: data.content,
                        // summary: data.content.slice(0, 50),
                        liked: data.likedBy.includes(senderName),
                        likeButtonText: data.likedBy.includes(senderName) ? 'Liked🥰' : 'Like👍',
                        likesCount: data.likes,
                        publishDate: new Date(data.postTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            timeZoneName: 'short'
                        }),
                    };
                })
                .catch(error => {
                    console.error('Fetching post data failed:', error);
                });
        },
        likePost() {
            const senderName = localStorage.getItem('name');
            const token = localStorage.getItem('token_my');
            fetch(`/api/post/like/${this.postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ senderName }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server response not ok');
                    }
                    return response.json();
                })
                .then(() => {
                    this.post.liked = !this.post.liked;
                    this.post.likeButtonText = this.post.liked ? 'Liked🥰' : 'Like👍';
                    this.post.likesCount += this.post.liked ? 1 : -1;
                })
                .catch(error => {
                    console.error('Liking post failed:', error);
                });
        },
    },
};
</script>

<style>
.likes-count {
    font-size: 0.9rem;
    color: #555;
}
</style>
