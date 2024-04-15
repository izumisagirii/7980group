<script setup>
import { onMounted, ref } from "vue";

const users = ref([]);
const name = ref("");

const loadAsyncData = async () => {
    try {
        // Get the token from local storage    
        const token = localStorage.getItem('token');

        // Send a request to the endpoint with the token in the Authorization header
        var response = await fetch("/api/users/with/bookings", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // convert the response to json
        const json = await response.json();
        // log the json
        console.log(json);
        // set the data
        users.value = json;
    } catch (error) {
        console.log(error);
    }
};
const logout = function () {
    localStorage.removeItem('token');
    location.reload()
}
onMounted(() => {
    loadAsyncData();
});
</script>

<template>
    {{ name }}
    <div v-for="user in users" :key="user._id">
        {{ user }}
    </div>
</template>