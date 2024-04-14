<template>
    <a class="nav-link" :href="url">{{ text }}</a>
</template>

<script>
export default {
    props: {
        text: String,
        url: String
    }
}
</script>

<style scoped>
.nav-link {
    color: #007bff;
    text-decoration: none;
    margin-right: 16px;
}

.nav-link:hover {
    text-decoration: underline;
}
</style>
