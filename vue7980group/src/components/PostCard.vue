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
        this.fetchPostData();
    },
    methods: {
        fetchPostData() {
            const senderName = localStorage.getItem('name');
            const token = localStorage.getItem('token');
            fetch(`/api/post/${this.id}`, {
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
                        // summary: data.content,
                        summary: data.content.length > 80 ? data.content.slice(0, 80) + '...' : data.content,
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
        readMore() {
            this.$router.push({ path: `/post/${this.id}` });
        },
        likePost() {
            const senderName = localStorage.getItem('name');
            const token = localStorage.getItem('token');
            fetch(`/api/post/like/${this.id}`, {
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
