import { computed, onMounted } from "vue";
import { usePosts } from "@/composables/usePosts";
import { useUsers } from "@/composables/useUsers";

export const usePostsAndUsers = () => {
  const {
    posts: postsRef,
    loading: postsLoading,
    error: postsError,
    fetchPosts,
    deletePost
  } = usePosts();

  const {
    users: usersRef,
    loading: usersLoading,
    error: usersError,
    fetchUsers,
  } = useUsers();

  const mergedPosts = computed(() => {
    if (!postsRef.value.length || !usersRef.value.length) {
      return [];
    }

    return postsRef.value.map((post) => {
      const user = usersRef.value.find((user) => user.id === post.userId);
      return {
        ...post,
        author: user ? user.name : "Unknown User",
      };
    });
  });

  const isLoading = computed(() => postsLoading.value || usersLoading.value);
  const combinedError = computed(() => postsError.value || usersError.value);

  onMounted(() => {
    fetchPosts();
    fetchUsers();
  });

  return {
    mergedPosts,
    isLoading,
    combinedError,
    fetchPosts,
    fetchUsers,
    postsError,
    usersError,
    deletePost,
  };
};
