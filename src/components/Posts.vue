<template>
  <div>
    <h2>Postingan</h2>
    <select v-model="selectedUser" @change="onUserChange">
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
</template>

<script>
export default {
  props: {
    users: Array,
    posts: Array,
  },
  data() {
    return {
      selectedUser: null,
    };
  },
  methods: {
    onUserChange() {
      this.$emit('update-selected-user', this.selectedUser);
    },
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(
        (post) => post.userId === parseInt(this.selectedUser)
      );
    },
  },
};
</script>
