<template>
    <div class="card mb-3" v-for="item in post" :key="item.id">
        <div class="card-body">
            <h5 class="card-title">{{ item.author }}</h5>
            <p class="card-text">{{ item.comment }}</p>
            <p class="card-text"><small class="text-muted">Posted on {{ item.publishDate }}</small></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ReplyCards',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            post: []
        };
    },
    created() {
        this.fetchCommentData();
    },
    methods: {
        fetchCommentData() {
            fetch(`/api/comments/${this.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.post = data.map(comment => ({
                        author: comment.username,
                        comment: comment.comment,
                        publishDate: new Date(comment.commentedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            timeZoneName: 'short'
                        }),
                    }));
                })
                .catch(error => {
                    console.error('Failed to fetch comments:', error);
                });
        },
    },
};
</script>
