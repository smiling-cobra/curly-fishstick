<template>
    <div class="mb-4">
      <h2 class="text-xl mb-2">Create a new Post</h2>
      <form @submit.prevent="handleSubmit" class="flex items-center space-x-2">
        <input
          v-model="title"
          class="border px-2 py-1"
          type="text"
          placeholder="Post title"
        />
        <input
          v-model="body"
          class="border px-2 py-1"
          type="text"
          placeholder="Post content"
        />
        <button
          type="submit"
          class="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    emits: ['submitPost'],
    setup(props, { emit }) {
      const title = ref('');
      const body = ref('');
  
      function handleSubmit() {
        if (!title.value || !body.value) {
          alert('Please fill in all fields');
          return;
        }
        emit('submitPost', {
          title: title.value,
          body: body.value,
          userId: 1, // or dynamic if you want
        });
        title.value = '';
        body.value = '';
      }
  
      return { title, body, handleSubmit };
    },
  };
  </script>
  