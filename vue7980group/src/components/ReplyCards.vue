<template>
    <div class="card mb-3" v-for="item in post" :key="item.id">
        <div class="card-body">
            <h5 class="card-title">{{ item.author }}</h5>
            <p class="card-text">{{ item.comment }}</p>
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
            post: [{
                author: 'ADMIN',
                comment: 'Test comment',
            }, {
                author: 'ADMIN',
                comment: 'Test comment',
            }, {
                author: 'ADMIN',
                comment: 'Test comment',
            }, {
                author: 'ADMIN',
                comment: 'Test comment',
            },]
        };
    },
    created() {
        this.fetchCommentData();
    },
    methods: {
        fetchCommentData() {
            // fetch(`/api/comments/${this.id}`)
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('Network response was not ok ' + response.statusText);
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         this.post = data;
            //     })
            //     .catch(error => {
            //         console.error('Fetching posts failed:', error);
            //     });
        },
    },
};
</script>
