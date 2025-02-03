import { createStore } from 'vuex';
import posts from '@/store/modules/posts';
import users from '@/store/modules/users';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    posts,
    users,
  },
  getters: {
    mergedPosts(state) {
      const postsList = state.posts.posts;
      const usersList = state.users.users;
      if (!postsList.length || !usersList.length) {
        return [];
      }
      return postsList.map(post => {
        const user = usersList.find(user => user.id === post.userId);
        return {
          ...post,
          author: user ? user.name : 'Unknown User',
        };
      });
    },
    isLoading(state) {
      return state.posts.loading || state.users.loading;
    },
    combinedError(state) {
      return state.posts.error || state.users.error;
    },
  },
  plugins: [createPersistedState()],
});