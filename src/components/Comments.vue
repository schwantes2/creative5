<template>
<div>

<div v-if="user">
<h3>Add a Comment</h3>
  <form v-on:submit.prevent="addComment">
    <textarea v-model="addedComment"></textarea>
    <br />
    <button type="submit">Comment</button>
  </form>
  <h3>Comments</h3>
  <div v-for="comment in photo.comments">
    <hr>
    <p>{{comment.addedComment}}</p>
    <p><i>-- {{comment.addedName}},</i></p>
  </div>
</div>
<div v-else>
  <p>If you would like to comment on this photo, please register for an account or login.</p>
  <router-link to="/register" class="pure-button">Register</router-link> or
  <router-link to="/login" class="pure-button">Login</router-link>
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
      addedName: 'addedName',
      addedComment: 'addedComment',
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
          const formData = new FormData();
          formData.append('id', this.$route.params.id);
          formData.append('addedName', this.addedName);
          formData.append('addedComment', this.addedComment);
          //this.error = await this.$store.dispatch("addComment", formData);
          //this.error = await this.$store.dispatch("addComment", this.$route.params.id);
          this.error = await this.$store.dispatch("addComment", {id:this.$route.params.id, comment:this.addedComment});
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
