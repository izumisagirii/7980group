<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h6 class="card-subtitle mb-2 text-muted">Posted by: {{ post.author }}</h6>
                <span v-if="post.likesCount" class="likes-count">{{ post.likesCount }} Likes</span>
                <div class="text-muted">
                    Posted on: {{ post.publishDate }}
                </div>
            </div>
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.summary }}</p>

            <div class="d-flex justify-content-between">
                <a class="btn btn-primary" @click="readMore">Read More</a>
                <button type="button" :class="['btn', post.liked ? 'btn-danger' : 'btn-secondary']" @click="likePost">
                    {{ post.likeButtonText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// import { useRoute } from 'vue-router';
// const route = useRoute();
export default {
    name: 'PostCard',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            post: {
                author: 'ADMIN',
                title: 'Post Title',
                summary: 'This is a short summary of the post...',
                liked: false,
                likeButtonText: 'Like👍',
                likesCount: 0,
                publishDate: '1970/1/1',
            },
        };
    },
    created() {
        this.fetchPostData();
    },
    methods: {
        fetchPostData() {
            // fetch(`/api/posts/${this.id}`)
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('response not ok');
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         this.post = data;
            //     })
            //     .catch(error => {
            //         console.error('get posts failed:', error);
            //     });
        },
        readMore() {
            console.log('Read More clicked');
            this.$router.push({ path: `/post/${this.id}` });
        },
        likePost() {
            // fetch(`/api/posts/like/${this.id}`, {
            //     method: 'PUT',
            // })
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('response not ok');
            //         }
            //         return response.json();
            //     })
            //     .then(() => {
            this.post.liked = !this.post.liked;
            this.post.likeButtonText = this.post.liked ? 'Liked🥰' : 'Like👍';
            this.post.likesCount += this.post.liked ? 1 : -1;
            //     })
            //     .catch(error => {
            //         console.error('like failed:', error);
            //     });
            // console.log('Like button clicked', this.post.liked);
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
