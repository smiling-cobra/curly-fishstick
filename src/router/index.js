import { createRouter, createWebHistory } from 'vue-router';
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';

const routes = [
  { path: '/', name: 'Home', component: PostList },
  { path: '/posts/:id', name: 'PostForm', component: PostForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
