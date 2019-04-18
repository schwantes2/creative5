<template>
<div>
<router-link :to="{ name: 'photo', params: { id: photo._id }}"><img :src="photo.path" /></router-link>
  <p class="photoTitle">{{photo.title}}</p>
  <p class="photoDate">
    <span v-if="photo.user.name">{{photo.user.name}}, </span>
    {{formatDate(photo.created)}}
  </p>
  <p>{{photo.description}}</p>
<Comments/>
</div>
</template>

<style scoped>
.photoTitle {
  margin: 0px;
  font-size: 1.2em;
}

.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>

<script>
// @ is an alias to /src
import Comments from '@/components/Comments.vue'
import moment from 'moment';

export default {
  name: 'home',
  components: {
    Comments
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
