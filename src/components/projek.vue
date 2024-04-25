<script>
let id = 0

export default {
  data() {
    return {
      newTodo: '',
      hideCompleted: false,
      todos: [
        { id: id++, text: 'Learn HTML', done: true },
        { id: id++, text: 'Learn JavaScript', done: true },
        { id: id++, text: 'Learn Vue', done: false }
      ]
    }
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    }
  }
}
</script>

<template>
   <div class="container">
    <div class="konten">
      <h1>To-Do List Showroom Mobil</h1>
      <hr />
      <form @submit.prevent="addTodo">
        <input class="input" v-model="newTodo" />
        <button>Tambahkan Mobil</button>
      </form>
      <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
          <div class="list">
            <input type="checkbox" v-model="todo.done" />
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
            <button @click="removeTodo(todo)">X</button>
          </div>
        </li>
      </ul>
      <button @click="hideCompleted = !hideCompleted">
        {{ hideCompleted ? 'Show all' : 'Hide completed' }}
      </button>
      <p>Explore our collection of stunning cars in our Showroom Mobil!</p>
    </div>
  </div>
</template>


<style>
.done {
  text-decoration: line-through;
}
button {
  color: black;
  background-color: white; /* Add this line to make the button white */
  border: 2px solid white; /* Add this line to create a thick white border */
}
</style>