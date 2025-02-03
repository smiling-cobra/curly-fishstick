import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export default {
  namespaced: true,
  state: {
    posts: [],
    loading: false,
    error: null,
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    setError(state, error) {
      state.error = error;
    },
    addPost(state, post) {
      // Add the new post to the beginning of the posts array
      state.posts.unshift(post);
    },
    updatePost(state, updatedPost) {
      const index = state.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts.splice(index, 1, updatedPost);
      }
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId);
    },
  },
  actions: {
    async fetchPosts({ commit, state }) {
      commit('setLoading', true);
      try {
        const response = await axios.get(`${baseUrl}/posts`);
        // Merge the existing (persisted) posts with the API posts.
        const persistedPosts = state.posts;
        const persistedIds = persistedPosts.map(post => post.id);
        const merged = [...persistedPosts];
        for (const apiPost of response.data) {
          if (!persistedIds.includes(apiPost.id)) {
            merged.push(apiPost);
          }
        }
        commit('setPosts', merged);
        commit('setError', null);
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
    async createPost({ commit }, postData) {
      commit('setLoading', true);
      try {
        const response = await axios.post(`${baseUrl}/posts`, postData);
        let newPost = response.data;
        // Ensure the new post has a valid userId.
        // If not, assign a default (1 for example).
        if (!newPost.userId) {
          newPost.userId = 1;
        }
        commit('addPost', newPost);
        commit('setError', null);
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
    async updatePost({ commit }, postData) {
      commit('setLoading', true);
      try {
        await axios.put(`${baseUrl}/posts/${postData.id}`, postData);
        commit('updatePost', postData);
        commit('setError', null);
      } catch (error) {
        commit('updatePost', postData);
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
    async deletePost({ commit }, postId) {
      commit('setLoading', true);
      try {
        await axios.delete(`${baseUrl}/posts/${postId}`);
        commit('deletePost', postId);
        commit('setError', null);
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
  },
};
