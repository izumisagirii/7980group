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
export default {
    data() {
        return {
            post: {
                title: '',
                topic: '',
                content: ''
            }
        };
    },
    methods: {
        async submitPost() {
            try {
                const token = localStorage.getItem('token_my');
                const senderName = localStorage.getItem('name');
                this.post = this.post || {};
                this.post.senderName = senderName;

                const response = await fetch('/api/publish', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization_my': `Bearer ${token}`,
                    },
                    body: JSON.stringify(this.post)
                });
                if (!response.ok) throw new Error('fail to pub');
                alert('success!');
                this.$router.push('/browse');
            } catch (error) {
                console.error('Error Pub', error);
                alert('Error Publish');
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