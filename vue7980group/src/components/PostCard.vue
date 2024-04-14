<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h6 class="card-subtitle mb-2 text-muted">Posted by: ADMIN</h6>
                <span v-if="likesCount" class="likes-count">{{ likesCount }} Likes</span>
            </div>
            <h5 class="card-title">Post Title</h5>
            <p class="card-text">This is a short summary of the post...</p>
            <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-primary" @click="readMore">Read More</a>
                <button type="button" :class="['btn', liked ? 'btn-danger' : 'btn-secondary']" @click="likePost">
                    {{ likeButtonText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostCard',
    data() {
        return {
            liked: false,
            likeButtonText: 'Like👍',
            likesCount: 0,
        };
    },
    methods: {
        readMore() {
            console.log('Read More clicked');
        },
        likePost() {
            this.liked = !this.liked;
            this.likeButtonText = this.liked ? 'Liked🥰' : 'Like👍';
            this.likesCount += this.liked ? 1 : -1;
            console.log('Like button clicked', this.liked);
        }
    }
};
</script>

<style>
.likes-count {
    font-size: 0.9rem;
    color: #555;
}
</style>
