<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Forum</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/browse">Browse Posts</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/publish">Publish Post</router-link>
                    </li>
                </ul>
                <form class="d-flex" @submit.prevent="onSearch">
                    <input class="form-control me-2" type="search" placeholder="Search" v-model="searchQuery"
                        aria-label="Search">
                    <button class="btn btn-outline-light" type="submit">Search</button>
                </form>
                <ul class="navbar-nav">
                    <li class="nav-item" v-if="isLoggedIn">
                        <a class="nav-link" href="#" @click="logout">Logout</a>
                    </li>
                    <li class="nav-item" v-else>
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/register">Register</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            searchQuery: '',
            isLoggedIn: false,
        };
    },
    created() {
        this.checkLoginStatus();
    },
    watch: {
        // 监听$route对象，当路由变化时调用checkLoginStatus方法
        '$route': 'checkLoginStatus'
    },
    methods: {
        onSearch() {
            // Handle the search logic here
            console.log('Searching for:', this.searchQuery);
            this.$router.push('/search/' + this.searchQuery)
        },
        logout() {
            console.log('Logging out');
            this.handleLogout();
            this.isLoggedIn = false;
            this.$router.push('/');
        },
        checkLoginStatus() {
            this.isLoggedIn = this.checkLoggedIn();
        },
        checkLoggedIn() {
            return localStorage.getItem('token') ? true : false;
        },
        handleLogout() {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            console.log('Logged out successfully');
        },
    }
};
</script>
