<template>
    <div v-if="show" class="photo-modal" @click="close">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="close">&times;</span>
        <img :src="photo.url" alt="Photo" />
        <p>{{ photo.title }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PhotoDetail',
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      photo: {
        type: Object,
        required: true,
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .photo-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    font-size: 24px;
  }
  
  img {
    max-width: 100%;
    max-height: 80vh;
  }
  </style>
  