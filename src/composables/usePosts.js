import { ref, onMounted } from 'vue';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const usePosts = () => {
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPosts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/posts`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      posts.value = await response.json();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  const createPost = async (newPost) => {
    try {
      const response = await fetch(`${baseUrl}/posts`, getHeaders('POST', newPost));
      if (!response.ok) throw new Error('Failed to create post');
      const data = await response.json();

      // JSONPlaceholder returns id = 101 for a new post,
      // but in real scenario, you’d get actual id from your backend
      posts.value.unshift(data);
    } catch (e) {
      console.error(e);
    }
  }

  const updatePost = async (id, updatedPost) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, getHeaders('POST', updatedPost));
      if (!response.ok) throw new Error('Failed to update post');
      const data = await response.json();

      // Replace the post in our local array for a real-time update
      const index = posts.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        posts.value[index] = data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  const deletePost = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');

      // Filter out the deleted post from local state
      posts.value = posts.value.filter((post) => post.id !== id);
    } catch (e) {
      console.error(e);
    }
  }

  // Optionally, auto-fetch posts on mount
  onMounted(() => {
    fetchPosts();
  });

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
}

const getHeaders = (method, payload) => ({
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
});