<template>
  <div id="app">
    <!-- Main Content -->
    <main>
      <div v-if="activeMenu === 'projek'">
        <!-- Fitur Todos -->
        <h2>Todos</h2>
        <!-- Placeholder untuk implementasi fitur Todos -->
      </div>
      <div v-else-if="activeMenu === 'post'">
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
import Projek from './components/Projek.vue'; // Mengimpor komponen Projek
import Post from './components/Post.vue'; // Mengimpor komponen Post

export default {
  name: 'App',
  components: {
    Projek,
    Post
  },
  data() {
    return {
      activeMenu: 'projek',
      users: [],
      posts: [],
      selectedUser: null
    };
  },
  mounted() {
    // Ambil data user dari API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });

    // Ambil data postingan dari API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        this.posts = data;
      });
  },
  computed: {
    filteredPosts() {
      // Filter postingan berdasarkan user yang dipilih
      return this.posts.filter(post => post.userId === parseInt(this.selectedUser));
    }
  }
};
</script>

<style scoped>
/* CSS styling dapat ditambahkan di sini */
</style>
