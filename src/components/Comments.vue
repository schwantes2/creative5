<template>
<div class="comments">

<div v-if="user">
<h3>Add a Comment</h3>
  <form v-on:submit.prevent="addComment">
    <textarea v-model="addedComment"></textarea>
    <br />
    <button type="submit">Comment</button>
  </form>
  </div>
  <div v-else>
    <p>If you would like to comment on this photo, please register for an account or login.</p>
    <!-- <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link> -->
  </div>
</br>
  <div v-if="comment in photo.comments">
    <h3>Comments</h3>
  </div>
  <div v-for="comment in photo.comments">
    <hr>
    <p>{{comment.comment}}</p>
    <p><i>-- {{comment.name}}</i></p>
  </div>


</div>

</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Comments',
  data() {
    return{
      addedName: '',
      addedComment: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    photo() {
      return this.$store.state.photo;
    }
  },
  async created() {
    await this.$store.dispatch("getMyPhoto",this.$route.params.id);
    await this.$store.dispatch("getUser");
  },
  methods: {
    async addComment() {
        try {
          this.error = await this.$store.dispatch("addComment", {id:this.$route.params.id, name:this.user.name, comment:this.addedComment});
          if (!this.error) {
            this.addedName = '';
            this.addedComment = '';
            this.$emit('comment added');
          }
        } catch (error) {
          console.log(error);
        }
        this.$store.dispatch("getMyPhoto",this.$route.params.id);
    }
  }
}
</script>

<style scoped>
.comments{
  margin-left: 1rem;
  background-color: #F1F1F1;
  border-radius: 1rem;
  padding: 1rem;
}
</style>
