<template>
    <div>
      <h2>Todos</h2>
      <form @submit.prevent="addTodo">
        <input v-model="newTodo" placeholder="Tambahkan Kegiatan">
        <button>Tambahkan</button>
      </form>
      <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
          <input type="checkbox" v-model="todo.done">
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
          <button @click="$emit('remove-todo', todo)">X</button>
        </li>
      </ul>
      <button @click="$emit('toggle-hide-completed')">
        {{ hideCompleted ? 'Semua Kegiatan' : 'Kegiatan Belum Selesai' }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todos: Array,
      hideCompleted: Boolean,
    },
    data() {
      return {
        newTodo: '',
      };
    },
    methods: {
      addTodo() {
        this.$emit('add-todo', this.newTodo);
        this.newTodo = '';
      },
    },
    computed: {
      filteredTodos() {
        return this.hideCompleted
          ? this.todos.filter((t) => !t.done)
          : this.todos;
      },
    },
  };
  </script>
  
  <style scoped>
  .done {
    text-decoration: line-through;
  }
  </style>
  