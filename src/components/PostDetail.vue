<template>
    <div class="p-4">
      <div v-if="loading">Loading post...</div>
      <div v-else-if="error" class="text-red-600">{{ error }}</div>
      <div v-else>
        <h2 class="text-2xl mb-2">{{ post.title }}</h2>
        <p class="mb-4">{{ post.body }}</p>
  
        <button class="bg-gray-300 px-3 py-1 rounded" @click="goBack">Back</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    setup() {
      const post = ref(null);
      const loading = ref(false);
      const error = ref(null);
  
      const router = useRouter();
      const route = useRoute();
  
      onMounted(async () => {
        await fetchPost(route.params.id);
      });
  
      async function fetchPost(id) {
        loading.value = true;
        try {
          const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
          if (!res.ok) throw new Error('Error fetching post');
          post.value = await res.json();
        } catch (err) {
          error.value = err.message;
        } finally {
          loading.value = false;
        }
      }
  
      function goBack() {
        router.push('/');
      }
  
      return {
        post,
        loading,
        error,
        goBack,
      };
    },
  };
  </script>
  