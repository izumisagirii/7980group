<template>
    <section class="container">
        <div class="reg container mt-5">
            <h2 class="text-center mb-4">login</h2>
            <form @submit.prevent="loginUser">
                <div class="form-group mb-3">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" v-model="user.username" required>
                </div>
                <div class="form-group mb-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" v-model="user.password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">OK</button>
                <button class="btn btn-info w-100" @click="this.$router.push('/register')">Register</button>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
            }
        };
    },
    methods: {
        loginUser() {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.user)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('failed to login!');
                    }
                    return response.json();
                })
                .then(data => {
                    localStorage.setItem('token_my', data.token);
                    localStorage.setItem('name', this.user.username);
                    this.$router.push('/');
                })
                .catch(error => {
                    this.resetForm();
                    alert(error.message);
                });
        },
        resetForm() {
            this.user.username = '';
            this.user.password = '';
        }
    }
};
</script>


<style>
.reg {
    max-width: 400px;
    margin: auto;
    margin-top: 100px;
}
</style>