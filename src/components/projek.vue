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
      <div v-if="activeMenu === 'todos'">
        <!-- Fitur Todos -->
        <h2>Todos</h2>
        <form @submit.prevent="addTodo">
          <input v-model="newTodo" placeholder="Tambahkan Kegiatan">
          <button>Tambahkan</button>
        </form>
        <ul>
          <li v-for="todo in filteredTodos" :key="todo.id">
            <input type="checkbox" v-model="todo.done">
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
            <button @click="removeTodo(todo)">X</button>
          </li>
        </ul>
        <button @click="hideCompleted = !hideCompleted">
          {{ hideCompleted ? 'Semua Kegiatan' : 'Kegiatan Belum Selesai' }}
        </button>
      </div>
      <div v-else-if="activeMenu === 'posts'">
        <!-- Fitur Postingan -->
        <h2>Postingan</h2>
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div v-if="selectedUser">
          <div v-for="post in filteredPosts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </div>
        </div>
        <div v-else>
          <p>Silakan pilih pengguna untuk melihat postingan mereka.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
let id = 0;

export default {
  name: "App",
  data() {
    return {
      activeMenu: "todos",
      newTodo: "",
      hideCompleted: false,
      todos: [
        { id: id++, text: "Civic Turbo", done: true },
        { id: id++, text: "Lamborghini Gallardo", done: true },
        { id: id++, text: "Toyota Fortuner", done: false },
      ],
      users: [],
      posts: [],
      selectedUser: null,
    };
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false });
      this.newTodo = "";
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo);
    },
    showTodos() {
      this.activeMenu = "todos";
    },
    showPosts() {
      this.activeMenu = "posts";
    },
  },
  mounted() {
    // Ambil data user dari API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        this.users = data;
      });

    // Ambil data postingan dari API
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        this.posts = data;
      });
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos;
    },
    filteredPosts() {
      return this.posts.filter(
        (post) => post.userId === parseInt(this.selectedUser)
      );
    },
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
  color: #1E90FF; /* Warna teks saat dihover */
}
</style>
