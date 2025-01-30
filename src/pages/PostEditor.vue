<template>
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl">
      <!-- Modal Header -->
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-semibold">{{ postData.id ? "Edit Blog Entry" : "Create Blog Entry" }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>
  
      <!-- Form Body -->
      <form @submit.prevent="savePost" class="p-6 space-y-4">
        <!-- Title Input -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            v-model="postData.title"
            type="text"
            class="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
  
        <!-- Author Dropdown -->
        <div>
          <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
          <select
            id="author"
            v-model="postData.author"
            class="mt-1 block w-full p-2 border rounded-md"
          >
            <option value="">Select an author</option>
            <option v-for="author in authors" :key="author.id" :value="author.name">
              {{ author.name }}
            </option>
          </select>
        </div>
  
        <!-- Rich Text Editor -->
        <div>
          <label for="body" class="block text-sm font-medium text-gray-700">Body</label>
          <QuillEditor
            id="body"
            v-model="postData.body"
            theme="snow"
            class="mt-2 border rounded-md h-60"
          />
        </div>
      </form>
  
      <!-- Footer with Buttons -->
      <div class="flex justify-end p-4 border-t">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 rounded-md mr-2">Close</button>
        <button @click="savePost" class="px-4 py-2 bg-blue-600 text-white rounded-md">Save Changes</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watch } from "vue";
  import { QuillEditor } from "@vueup/vue-quill";
  import "@vueup/vue-quill/dist/vue-quill.snow.css";
  
  const props = defineProps({
    post: Object, // Receives a post object (for editing) or empty object (for creating)
    authors: Array, // List of authors
  });
  
  const emit = defineEmits(["save", "close"]);
  
  const postData = ref({});
  
  // Sync form when switching between edit & create modes
  watch(
    () => props.post,
    (newPost) => {
      postData.value = { ...newPost };
    },
    { immediate: true, deep: true }
  );
  
  // Save post and emit event
  const savePost = () => {
    emit("save", postData.value);
  };
  </script>
  