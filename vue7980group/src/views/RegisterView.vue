<template>
    <section class="container">
        <div class="reg container mt-5">
            <h2 class="text-center mb-4">register</h2>
            <form @submit.prevent="registerUser">
                <div class="form-group mb-3">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" v-model="user.username" required>
                </div>
                <!-- <div class="form-group mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model="user.email" required>
                </div> -->
                <div class="form-group mb-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" v-model="user.password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">OK</button>
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
                password: ''
            }
        };
    },
    methods: {
        registerUser() {
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.user)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Already registered!');
                    }
                    return response.json();
                })
                .then(data => {
                    // localStorage.setItem('token', data.token)
                    this.$router.push('/login');
                })
                .catch(error => {
                    this.resetForm();
                    alert(error.message);
                });
        },
        resetForm() {
            this.user.username = '';
            // this.user.email = '';
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
