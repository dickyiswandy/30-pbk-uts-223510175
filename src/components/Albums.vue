<template>
    <div>
      <h2>Albums</h2>
      <ul>
        <li v-for="album in albums" :key="album.id">
          <router-link :to="{ name: 'AlbumPhotos', params: { id: album.id }}">{{ album.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useAlbumStore } from '../stores/albumStore';
  
  export default {
    name: 'Albums',
    setup() {
      const albumStore = useAlbumStore();
      albumStore.fetchAlbums();
  
      return {
        albums: albumStore.albums,
      };
    },
  };
  </script>
  