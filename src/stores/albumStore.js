import { defineStore } from 'pinia';

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    albums: [],
    photos: [],
  }),
  actions: {
    async fetchAlbums() {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      this.albums = await response.json();
    },
    async fetchPhotos(albumId) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
      this.photos = await response.json();
    },
  },
});
