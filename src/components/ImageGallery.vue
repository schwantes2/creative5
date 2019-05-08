<template>
<div class="ImageGallery">
  <div class="masonry" v-for="photo in photos" v-bind:key="photo._id">
  <div class="item">
  <!-- <router-link :to="{ name: 'photo', params: { id: photo._id }}"><img :src="photo.chefPath" /> -->
  <router-link :to="{ name: 'photo', params: { id: photo._id }}"><img :src="photo.myPath" />

    <!-- <img :src="photo.chefPath"
      :onmouseover="setImagePath(photo.chefPath)"
      :onmouseout="setImagePath(photo.myPath)" /></a> -->
      <!-- <img :src="imagePath" @mouseover="setImagePath(photo.myPath)"/> -->
  </router-link>
    <p class="photoTitle">{{photo.title}}</p>
    <!-- <p class="photoDate">
      <span v-if="photo.user.name">{{photo.user.name}}, </span>
      {{formatDate(photo.created)}}
    </p> -->
    <!-- <p>{{photo.description}}</p> -->
  </div>
</div>
</div>
</template>

<style scoped>
img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
}

a {
    color: #CADAD9;
}

.ImageGallery{
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* column-count: 0; */
  /* align-items: center; */
  justify-content: center;
}
.masonry { /* Masonry container */
    /* flex-wrap: wrap; */
    flex-direction: row;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    /* column-count: 3; */
    align-items: center;
    column-gap: 1em;
    /* background-color: #072D40; */
}

.item { /* Masonry bricks or child elements */
    background-color: #F1F1F1;
    /* display: inline-block; */
    margin: 10px 10px 1em;
    width: 100%;
    text-align: center;
    border-radius: 1rem;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    max-width: 500px;
}


</style>

<script>
import moment from 'moment';

export default {
  name: 'ImageGallery',
  props: {
    photos: Array
  },
  data(){
    return{
      imagePath: null,
    }
  },
  methods: {
   formatDate(date) {
     if (moment(date).diff(Date.now(), 'days') < 15)
       return moment(date).fromNow();
     else
       return moment(date).format('d MMMM YYYY');
   },
   setImagePath(photoPath){
     this.imagePath = photoPath;
   },
   getImagePath(){
     // this.setImagePath(photo.chefPath);
     return this.imagePath;
   }
 }
}
</script>
