<template>
  <div id="app">
    <!-- Header -->
    <header>
      <nav>
        <ul>
          <li @click="navigate('Todos')" :class="{ active: isActive('Todos') }">Todos</li>
          <li @click="navigate('Posts')" :class="{ active: isActive('Posts') }">Posts</li>
          <li @click="navigate('Albums')" :class="{ active: isActive('Albums') }">Albums</li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <router-view
        :todos="todos"
        :hide-completed="hideCompleted"
        @add-todo="addTodo"
        @remove-todo="removeTodo"
        @toggle-hide-completed="toggleHideCompleted"
        :users="users"
        :posts="posts"
        @update-selected-user="updateSelectedUser"
      />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeMenu: 'todos',
      hideCompleted: false,
      todos: [
        { id: 0, text: 'Civic Turbo', done: true },
        { id: 1, text: 'Lamborghini Gallardo', done: true },
        { id: 2, text: 'Toyota Fortuner', done: false },
      ],
      users: [],
      posts: [],
      selectedUser: null,
    };
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push({ id: this.todos.length, text: newTodo, done: false });
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo);
    },
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
    navigate(routeName) {
      this.$router.push({ name: routeName });
    },
    isActive(routeName) {
      return this.$route.name === routeName;
    },
    updateSelectedUser(selectedUser) {
      this.selectedUser = selectedUser;
    },
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        this.users = data;
      });

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

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.todos-container {
  max-width: 400px;
  width: 100%;
}
</style>
