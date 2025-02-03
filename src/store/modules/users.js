import { fetchUsers } from '@/api';

export default {
  namespaced: true,
  state: {
    users: [],
    loading: false,
    error: null,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('setLoading', true);
      try {
        const users = await fetchUsers();
        commit('setUsers', users);
        commit('setError', null);
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
  },
};
