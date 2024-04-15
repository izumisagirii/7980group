<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h6 class="card-subtitle mb-2 text-muted">Posted by: {{ post.author }}</h6>
                <div class="text-muted">
                    Posted on: {{ post.publishDate }}
                </div>
                <span v-if="post.likesCount" class="likes-count">{{ post.likesCount }} Likes</span>
            </div>
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.summary }}</p>

            <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-primary" @click="readMore">Read More</a>
                <button type="button" :class="['btn', post.liked ? 'btn-danger' : 'btn-secondary']" @click="likePost">
                    {{ post.likeButtonText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
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
            // getPostById(this.id).then(data => {
            //     this.post = { ...this.post, ...data };
            // });
            console.log(this.id)
        },
        readMore() {
            console.log('Read More clicked');
        },
        likePost() {
            this.post.liked = !this.post.liked;
            this.post.likeButtonText = this.post.liked ? 'Liked🥰' : 'Like👍';
            this.post.likesCount += this.post.liked ? 1 : -1;
            console.log('Like button clicked', this.post.liked);
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
