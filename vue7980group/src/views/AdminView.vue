<template>
    <div>
        <h2>ADMIN</h2>
        <div>
            <input v-model="postId" placeholder="Please insert post id">
            <button @click="deletePost">Delete Post</button>
        </div>
        <div>
            <input v-model="username" placeholder="Please insert user name">
            <button @click="deleteUser">Delete User</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            postId: '',
            username: ''
        };
    },
    methods: {
        deletePost() {
            const token = localStorage.getItem('token_my');
            if (!token) {
                alert('Unauth');
                return;
            }

            fetch(`/api/posts/${this.postId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Fail, check your role');
                    }
                    alert('Delete post success');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        deleteUser() {
            const token = localStorage.getItem('token_my');
            if (!token) {
                alert('Unauth');
                return;
            }

            fetch(`/api/users/${this.username}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Fail, check your role');
                    }
                    alert('Delete user success');
                })
                .catch(error => {
                    alert(error.message);
                });
        }
    }
};
</script>
