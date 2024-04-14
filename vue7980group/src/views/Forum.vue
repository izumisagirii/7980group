<template>
  <div class="bg-zinc-50 dark:bg-zinc-900 min-h-screen">
    <Navbar />
    <div class="max-w-7xl mx-auto px-4 py-8">
      <PostCard />
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import PostCard from './PostCard.vue';

export default {
    components: {
        Navbar,
        PostCard
    }
}
</script>

<!-- Navbar.vue -->
<template>
  <nav class="bg-white dark:bg-zinc-800 shadow">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex">
          <NavLink text="Home" />
          <NavLink text="Publish" />
          <NavLink text="Browse" />
        </div>
        <div class="flex">
          <NavLink text="Login" />
          <NavLink text="Register" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import NavLink from './NavLink.vue';

export default {
  components: {
    NavLink
  }
}
</script>

<!-- PostCard.vue -->
<template>
    <div class="bg-white dark:bg-zinc-800 shadow rounded-lg p-4">
        <div class="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 py-4">
            <div>
                <h2 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Post Title</h2>
                <p class="text-zinc-500 dark:text-zinc-400">Posted by John Doe</p>
            </div>
            <a href="#" class="text-blue-500 dark:text-blue-400">View Post</a>
        </div>
    </div>
</template>
