<template>
<div class="photoPage">
</br>
<h1 class="photoTitle">{{photo.title}}</h1>
<p class="user">Uploaded by {{photo.user.name}}</p>
<!-- <router-link class="foodPics" :to="{ name: 'photo', params: { id: photo._id }}"><img :src="photo.chefPath" /><img :src="photo.myPath" /></router-link> -->
<router-link class="foodPics" :to="{ name: 'photo', params: { id: photo._id }}"><img :src="photo.myPath" /></router-link>

  <!-- <p class="photoDate"> -->

    <!-- {{formatDate(photo.created)}} -->
  <!-- </p> -->
  <p>{{photo.description}}</p>
  <comments/>
</div>
</template>

<style scoped>
.photoTitle {
  margin: 0px;
  font-family: 'Avenir';
  font-size: 2rem;
  text-align: center;
}
.user {
  margin-top: .2rem;
  font-size: 1rem;
}
.foodPics{
  text-align: center;
  display: inline-block;
}

.photoPage{
  margin: 4rem;
  background-color: #F1F1F1;
  border-radius: 1rem;
  padding: 1rem;
}

.photoPage p{
  margin-left: 2rem;
  margin-right: 2rem;
  max-width: 78rem;
  text-align: center;
}

.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

.image {
  display: inline-block;
  width: 100%;
}

img {
  margin-left:2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
  border-radius: 1rem;
}

</style>

<script>
// @ is an alias to /src
import Comments from '@/components/Comments.vue'
import moment from 'moment';

export default {
  name: 'home',
  components: {
    Comments,
  },
  computed: {
    photo() {
      return this.$store.state.photo;
    }
  },
  async created() {
    await this.$store.dispatch("getMyPhoto",this.$route.params.id);
  },
  methods: {
   formatDate(date) {
     if (moment(date).diff(Date.now(), 'days') < 15)
       return moment(date).fromNow();
     else
       return moment(date).format('d MMMM YYYY');
   }
 }
}
</script>
