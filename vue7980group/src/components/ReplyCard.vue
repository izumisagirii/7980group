<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="comments">
                <h5>Comment</h5>
                <div class="mb-3">
                    <textarea class="form-control" rows="3" v-model="commentContent"
                        placeholder="Add your comment..."></textarea>
                </div>
                <button type="button" class="btn btn-primary" @click="replyPost">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ReplyCard',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            commentContent: '',
        };
    },
    methods: {
        replyPost() {
            const token = localStorage.getItem('token_my');
            const requestBody = {
                id: this.id,
                username: localStorage.getItem('name'),
                comment: this.commentContent,
            };

            fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization_my': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('comment success:', data);
                    alert('comment success');
                    this.commentContent = '';
                })
                .catch((error) => {
                    console.error('comment fail:', error);
                });
        },
    },
};
</script>
