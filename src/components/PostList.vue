<template>
    <div class="p-4">
      <h1 class="text-2xl mb-4">All Posts</h1>
  
      <div v-if="error" class="text-red-600">Error: {{ error }}</div>
      <div v-if="loading" class="text-blue-600">Loading...</div>
  
      <!-- Post Form for creating a new post -->
      <PostForm @submitPost="handleCreatePost" />
  
      <ul v-if="!error && !loading" class="space-y-2 mt-4">
        <li v-for="post in posts" :key="post.id" class="p-2 bg-gray-100 rounded flex justify-between items-center">
          <div @click="goToDetail(post.id)" class="cursor-pointer">
            <strong>{{ post.title }}</strong>  
          </div>
          <div>
            <!-- Button to delete or edit -->
            <button 
              class="bg-red-500 text-white px-2 py-1 rounded mr-2"
              @click="handleDelete(post.id)"
            >
              Delete
            </button>
            <!-- Could link to an Edit route or show inline editing -->
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { usePosts } from '../composables/usePosts';
  import PostForm from './PostForm.vue';
  import { useRouter } from 'vue-router';
  
  export default {
    components: { PostForm },
    setup() {
      const { posts, loading, error, deletePost, createPost } = usePosts();
      const router = useRouter();
  
      function handleDelete(id) {
        deletePost(id);
      }
  
      async function handleCreatePost(newPost) {
        await createPost(newPost);
      }
  
      function goToDetail(id) {
        router.push({ name: 'PostDetail', params: { id } });
      }
  
      return {
        posts,
        loading,
        error,
        handleDelete,
        handleCreatePost,
        goToDetail
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any local styles here if needed */
  </style>
  