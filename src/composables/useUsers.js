import { ref } from 'vue';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useUsers = () => {
  const users = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/users`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      users.value = await response.json();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
}