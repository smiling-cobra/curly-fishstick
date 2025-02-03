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
        <input id="title" v-model="postData.title" type="text" class="mt-1 block w-full p-2 border rounded-md"
          required />
      </div>

      <!-- Author Dropdown -->
      <div>
        <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
        <select id="author" v-model="postData.userId" class="mt-1 block w-full p-2 border rounded-md">
          <option value="">Select an author</option>
          <option v-for="author in authors" :key="author.id" :value="author.id">
            {{ author.name }}
          </option>
        </select>
      </div>

      <!-- Text Editor -->
      <div>
        <label for="body" class="block text-sm font-medium text-gray-700">Body</label>
        <textarea id="body" v-model="postData.body" rows="10" class="mt-1 block w-full p-2 border rounded-md"
          placeholder="Enter your post content here..."></textarea>
      </div>
    </form>

    <!-- Modal Footer -->
    <div class="flex justify-end p-4 border-t">
      <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 rounded-md mr-2">Close</button>
      <button @click="savePost" class="px-4 py-2 bg-blue-600 text-white rounded-md">Save Changes</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const postData = ref({});

const props = defineProps({
  post: Object,
  authors: Array,
});

const emit = defineEmits(["save", "close"]);

// Sync form when switching between edit & create modes
watch(
  () => props.post,
  (newPost) => {
    postData.value = { ...newPost };
    // If creating a new post - initialize userId with a default value
    if (!newPost.userId) {
      postData.value.userId = "";
    }
  },
  { immediate: true, deep: true }
);

const savePost = () => {
  emit("save", postData.value);
};
</script>
