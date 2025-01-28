<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <input v-model="searchQuery" type="text" placeholder="Search for post..."
        class="border px-3 py-2 rounded w-full" />
      <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="openCreatePost">
        Create
      </button>
    </div>

    <div v-if="combinedError" class="text-red-600">Error: {{ combinedError }}</div>
    <div v-if="isLoading" class="text-blue-600">Loading...</div>

    <table v-if="!combinedError && !isLoading" class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-300">
          <th class="border px-4 py-2">
            <input type="checkbox" v-model="selectAll" @change="toggleSelecAll" />
          </th>
          <th class="border px-4 py-2">Title</th>
          <th class="border px-4 py-2">Description</th>
          <th class="border px-4 py-2">Author</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in filteredPosts" :key="post.id" class="border">
          <td class="border px-4 py-2">
            <input type="checkbox" v-model="selectedPosts" :value="post.id" />
          </td>
          <td class="border px-4 py-2 cursor-pointer" @click="goToDetail(post.id)">
            {{ post.title }}
          </td>
          <td class="border px-4 py-2 text-gray-600 truncate">
            {{ post.body }}
          </td>
          <td class="border px-4 py-2">{{ post.author }}</td>
          <td class="border px-4 py-2 relative">
            <button class="p-2" @click="toggleMenu(post.id)">⋮</button>
            <div v-if="activeMenu === post.id" class="absolute right-0 bg-white shadow-md p-2">
              <button class="block text-blue-500" @click="editPost(post.id)">Edit</button>
              <button class="block text-red-500 mt-1" @click="handleDelete(post.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { usePostsAndUsers } from "@/composables/usePostsAndUsers";

const router = useRouter();

const {
  mergedPosts,
  isLoading,
  combinedError,
} = usePostsAndUsers();

const searchQuery = ref("");
const selectAll = ref(false);
const activeMenu = ref(null);
const selectedPosts = ref([]);

const filteredPosts = computed(() =>
  mergedPosts.value.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const goToDetail = (id) => {
  router.push({ name: "PostForm", params: { id } });
};

const handleDelete = (id) => {
  deletePost(id);
};

const editPost = (id) => {
  console.log("Editing post", id);
};

const toggleMenu = (id) => {
  activeMenu.value = activeMenu.value === id ? null : id;
};

const toggleSelecAll = () => {
  selectedPosts.value = selectAll.value
    ? mergedPosts.value.map((post) => post.id)
    : [];
};

const openCreatePost = () => {
  console.log("Opening create post form");
};
</script>

<style scoped>
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
