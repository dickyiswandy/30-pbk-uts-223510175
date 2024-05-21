<template>
  <div id="app">
    <!-- Header -->
    <header>
      <nav>
        <ul>
          <li @click="showTodos" :class="{ active: activeMenu === 'todos' }">Todos</li>
          <li @click="showPosts" :class="{ active: activeMenu === 'posts' }">Posts</li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <Todos
        v-if="activeMenu === 'todos'"
        :todos="todos"
        :hide-completed="hideCompleted"
        @add-todo="addTodo"
        @remove-todo="removeTodo"
        @toggle-hide-completed="toggleHideCompleted"
      />
      <Posts
        v-else-if="activeMenu === 'posts'"
        :users="users"
        :posts="posts"
        @update-selected-user="updateSelectedUser"
      />
    </main>
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

let id = 0;

export default {
  name: 'App',
  components: {
    Todos,
    Posts,
  },
  data() {
    return {
      activeMenu: 'todos',
      hideCompleted: false,
      todos: [
        { id: id++, text: 'Civic Turbo', done: true },
        { id: id++, text: 'Lamborghini Gallardo', done: true },
        { id: id++, text: 'Toyota Fortuner', done: false },
      ],
      users: [],
      posts: [],
      selectedUser: null,
    };
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push({ id: id++, text: newTodo, done: false });
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo);
    },
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
    showTodos() {
      this.activeMenu = 'todos';
    },
    showPosts() {
      this.activeMenu = 'posts';
    },
    updateSelectedUser(selectedUser) {
      this.selectedUser = selectedUser;
    },
  },
  mounted() {
    // Ambil data user dari API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        this.users = data;
      });

    // Ambil data postingan dari API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        this.posts = data;
      });
  },
};
</script>

<style scoped>
header {
  background-color: #333;
  padding: 10px 0;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

nav ul li {
  margin-right: 20px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: all 0.3s ease;
}

nav ul li.active {
  color: #1E90FF; /* Warna teks aktif */
}

nav ul li:hover {
  color: #1E90FF; /* Warna teks saat dihover */
}
</style>
