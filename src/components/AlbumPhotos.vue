<template>
    <div>
      <h2>Album Photos</h2>
      <ul>
        <li v-for="photo in photos" :key="photo.id" @click="toggleSize(photo.id)">
          <img
            :src="photo.thumbnailUrl"
            :class="{ enlarged: isEnlarged(photo.id) }"
          />
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useAlbumStore } from '../stores/albumStore';
  import { onMounted, ref } from 'vue';
  
  export default {
    name: 'AlbumPhotos',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const albumStore = useAlbumStore();
      const enlargedPhotos = ref([]);
  
      onMounted(() => {
        albumStore.fetchPhotos(props.id);
      });
  
      const toggleSize = (photoId) => {
        const index = enlargedPhotos.value.indexOf(photoId);
        if (index === -1) {
          enlargedPhotos.value.push(photoId);
        } else {
          enlargedPhotos.value.splice(index, 1);
        }
      };
  
      const isEnlarged = (photoId) => {
        return enlargedPhotos.value.includes(photoId);
      };
  
      return {
        photos: albumStore.photos,
        toggleSize,
        isEnlarged,
      };
    },
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 10px;
    cursor: pointer;
  }
  
  img {
    transition: transform 0.3s ease;
    width: 150px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
  }
  
  img.enlarged {
    transform: scale(2);
  }
  </style>
  