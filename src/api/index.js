import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

// Create a configured axios instance
const api = axios.create({
  baseURL: baseUrl,
});

export const fetchPosts = async () => {
  const { data } = await api.get('/posts');
  return data;
};

export const fetchUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const createPost = async (postData) => {
  const { data } = await api.post('/posts', postData);
  return data;
};

export const updatePost = async (postData) => {
  const { data } = await api.put(`/posts/${postData.id}`, postData);
  return data;
};

export const deletePost = async (postId) => {
  const { data } = await api.delete(`/posts/${postId}`);
  return data;
};

export default {
  fetchPosts,
  fetchUsers,
  createPost,
  updatePost,
  deletePost,
};
