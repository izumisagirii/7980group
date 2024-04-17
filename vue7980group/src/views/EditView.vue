<template>
    <section class="container">
        <div class="container mt-5">
            <!-- <div class="card mb-3"> -->
            <div class="pubcard card-body">
                <form @submit.prevent="submitPost">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" v-model="post.title" maxlength="80"
                            placeholder="Pls input title" required>
                    </div>
                    <div class="form-group">
                        <label for="topic">Topic</label>
                        <select class="form-control" id="topic" v-model="post.topic" required>
                            <option disabled value="">Pls choose topic</option>
                            <option value="science">Science & Tech</option>
                            <option value="sports">Sports & Vitality</option>
                            <option value="literature">Literature & Arts</option>
                            <option value="music">Music & Harmony</option>
                            <option value="food">Food & Cuisine</option>
                            <option value="travel">Travel & Adventure</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="content">Content</label>
                        <textarea class="form-control" id="content" v-model="post.content" maxlength="4000" rows="8"
                            placeholder="Pls input content" required></textarea>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary">publish</button>
                </form>
            </div>
            <!-- </div> -->

        </div>
    </section>
</template>

<script>
import { useRoute } from 'vue-router';
export default {
    name: 'EditCard',
    data() {
        return {
            post: {
                title: '',
                topic: '',
                content: '',
            },
            postId: '0'
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
            const token = localStorage.getItem('token');
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
                        title: data.title,
                        topic: data.topic,
                        content: data.content,
                    };
                })
                .catch(error => {
                    console.error('Fetching post data failed:', error);
                });
        },
        async submitPost() {
            try {
                const token = localStorage.getItem('token');
                const senderName = localStorage.getItem('name');
                this.post = this.post || {};
                this.post.senderName = senderName;

                const response = await fetch(`/api/update/${this.postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(this.post)
                });
                if (!response.ok) throw new Error('fail to update');
                alert('success!');
                this.$router.push('/browse');
            } catch (error) {
                console.error('Error Update', error);
                alert('Error Update');
            }
        }


    }
};
</script>

<style scoped>
.pubcard {
    margin-top: 30px;
}
</style>