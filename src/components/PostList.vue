<template>
  <div class="p-4">
    <!-- Search for post & Create post -->
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for post..."
        class="border px-3 py-2 rounded w-full"
      />
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        @click="openCreatePost"
      >
        Create
      </button>
    </div>

    <!-- Application statuses -->
    <div v-if="combinedError" class="text-red-600">
      Error: {{ combinedError.message || combinedError }}
    </div>
    <div v-if="isLoading" class="text-blue-600">Loading...</div>

    <!-- Post list -->
    <table
      v-if="!combinedError && !isLoading"
      class="w-full border-collapse border border-gray-300 table-fixed"
    >
      <thead>
        <tr class="bg-gray-300">
          <th class="w-14 border py-2">
            <input type="checkbox" v-model="selectAll" @change="toggleSelecAll" />
          </th>
          <th class="border py-2">Title</th>
          <th class="border py-2">Description</th>
          <th class="w-24 border py-2">Author</th>
          <th class="w-14 border py-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in filteredPosts" :key="post.id" class="border">
          <td class="border px-5 py-2">
            <input type="checkbox" v-model="selectedPosts" :value="post.id" />
          </td>
          <td
            class="border px-4 py-2 cursor-pointer"
            @click="editPost(post)"
          >
            {{ post.title }}
          </td>
          <td class="border px-4 py-2 text-gray-600 truncate">
            <span v-html="post.body"></span>
          </td>
          <td class="border px-4 py-2">
            {{ post.author }}
          </td>
          <td class="border px-4 py-2 relative">
            <button class="p-2" @click.stop="toggleMenu(post.id)">
              ⋮
            </button>
            <!-- Action menu -->
            <div
              v-if="activeMenu === post.id"
              class="absolute right-0 bg-white shadow-md p-2 rounded-md z-50"
              @mouseleave="closeMenu"
              @click.stop
            >
              <button
                class="block text-blue-500 px-4 py-2 hover:bg-gray-100"
                @click="editPost(post)"
              >
                Edit
              </button>
              <button
                class="block text-red-500 px-4 py-2 hover:bg-gray-100"
                @click="handleDelete(post.id)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Post modal window -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <PostDetails
        :post="selectedPost"
        :authors="authors"
        @save="savePost"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed, onMounted } from 'vue';
import PostDetails from '@/components/PostDetails.vue';

const store = useStore();

const searchQuery = ref('');
const selectAll = ref(false);
const activeMenu = ref(null);
const modalOpen = ref(false);
const isEditing = ref(false);
const selectedPosts = ref([]);
const selectedPost = ref(null);

const mergedPosts = computed(() => store.getters.mergedPosts);
const isLoading = computed(() => store.getters.isLoading);
const combinedError = computed(() => store.getters.combinedError);
const authors = computed(() => store.state.users.users);

// Filter posts by search query
const filteredPosts = computed(() =>
  mergedPosts.value.filter(post =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const toggleSelecAll = () => {
  if (selectAll.value) {
    selectedPosts.value = filteredPosts.value.map(post => post.id);
  } else {
    selectedPosts.value = [];
  }
};

const openCreatePost = () => {
  isEditing.value = false;
  // Create an empty post (assign userId as needed later in PostDetails)
  selectedPost.value = { title: '', body: '', userId: null };
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

const savePost = (newPost) => {
  if (isEditing.value) {
    store.dispatch('posts/updatePost', newPost);
  } else {
    store.dispatch('posts/createPost', newPost);
  }
  closeModal();
};

const handleDelete = (postId) => {
  store.dispatch('posts/deletePost', postId);
};

const toggleMenu = (id) => {
  activeMenu.value = activeMenu.value === id ? null : id;
};

const closeMenu = () => {
  setTimeout(() => {
    activeMenu.value = null;
  }, 300);
};

onMounted(() => {
  store.dispatch('posts/fetchPosts');
  store.dispatch('users/fetchUsers');
});
</script>
