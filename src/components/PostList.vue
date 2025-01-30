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

    <table v-if="!combinedError && !isLoading" class="w-full border-collapse border border-gray-300 table-fixed">
      <thead>
        <tr class="bg-gray-300">
          <th class="w-14 border py-2">
            <input type="checkbox" v-model="selectAll" @change="toggleSelecAll" />
          </th>
          <th class="border py-2">Title</th>
          <th class="border py-2">Description</th>
          <th class="w-24 border py-2">Author</th>
          <th class="w-14 border py-2" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in filteredPosts" :key="post.id" class="border">
          <td class="border px-5 py-2">
            <input type="checkbox" v-model="selectedPosts" :value="post.id" />
          </td>
          <td class="border px-4 py-2 cursor-pointer" @click="editPost(post)">
            {{ post.title }}
          </td>
          <td class="border px-4 py-2 text-gray-600 truncate">
            <span v-html="post.body"></span>
          </td>
          <td class="border px-4 py-2">
            {{ post.author }}
          </td>
          <td class="border px-4 py-2 relative">
            <button class="p-2" @click.stop="toggleMenu(post.id)">⋮</button>

            <div v-if="activeMenu === post.id" class="absolute right-0 bg-white shadow-md p-2 rounded-md z-50"
              @mouseleave="closeMenu" @click.stop>
              <button class="block text-blue-500 px-4 py-2 hover:bg-gray-100" @click="editPost(post)">
                Edit
              </button>
              <button class="block text-red-500 px-4 py-2 hover:bg-gray-100" @click="handleDelete(post.id)">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="modalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <PostEditor :post="selectedPost" :authors="authors" @save="savePost" @close="closeModal" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PostEditor from "@/pages/PostEditor.vue";
import { usePostsAndUsers } from "@/composables/usePostsAndUsers";

const { isLoading, deletePost, mergedPosts, combinedError } = usePostsAndUsers();

const searchQuery = ref("");
const selectAll = ref(false);
const activeMenu = ref(null);
const selectedPosts = ref([]);
const modalOpen = ref(false);
const isEditing = ref(false);
const selectedPost = ref(null);

// Sample authors
const authors = ref([
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
]);

const filteredPosts = computed(() =>
  mergedPosts.value.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const openCreatePost = () => {
  isEditing.value = false;
  selectedPost.value = { title: "", author: "", body: "" };
  modalOpen.value = true;
};

const editPost = (post) => {
  isEditing.value = true;
  selectedPost.value = { ...post };
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};

const savePost = (updatedPost) => {
  console.log("Saved Post:", updatedPost);
  closeModal();
};

const handleDelete = (postId) => {
  deletePost(postId);
};

const toggleMenu = (id) => {
  activeMenu.value = activeMenu.value === id ? null : id;
};

const closeMenu = () => {
  setTimeout(() => {
    activeMenu.value = null;
  }, 300);
};
</script>
