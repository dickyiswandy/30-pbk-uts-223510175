import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Posts from '../components/Posts.vue';
import Albums from '../components/Albums.vue';
import AlbumPhotos from '../components/AlbumPhotos.vue';

const routes = [
  { path: '/todos', name: 'Todos', component: Todos, props: true },
  { path: '/posts', name: 'Posts', component: Posts, props: true },
  { path: '/albums', name: 'Albums', component: Albums, props: true },
  { path: '/albums/:id', name: 'AlbumPhotos', component: AlbumPhotos, props: true },
  { path: '/', redirect: '/todos' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
