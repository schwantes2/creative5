<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Login</h1>
        </div>
        <div class="modal-body">
          <!-- <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <input v-model="title" placeholder="Title">
            <p></p>
            <textarea v-model="description" placeholder="Description"></textarea>
            <p></p>
            <input type="file" name="photo" @change="fileChanged">
            <p></p>
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Upload</button> -->
            <form @submit.prevent="login" class="pure-form pure-form-aligned">
            <fieldset>
              <p class="pure-form-message-inline">All fields are required.</p>

              <div class="pure-control-group">
                <label for="username">Username</label>
                <input v-model="username" type="text" placeholder="Username">
              </div>

              <div class="pure-control-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" placeholder="Password">
              </div>

              <div class="pure-controls">
                <button type="submit" class="pure-button pure-button-primary">Submit</button>
              </div>
            </fieldset>
          </form>
          <p v-if="error" class="error">{{error}}</p>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<style scoped>
.header {
  display: flex;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}
</style>

<script>
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
      description: '',
      file: null,
      error: '',
    }
  },
  methods: {
  fileChanged(event) {
    this.file = event.target.files[0]
  },
  close() {
    this.$emit('escape');
  },
  async login() {
    try {
      this.error = await this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      });
      if (this.error === "")
        this.$router.push('mypage');
    } catch (error) {
      console.log(error);
    }
  },
  async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        formData.append('title', this.title);
        formData.append('description', this.description);
        this.error = await this.$store.dispatch("upload", formData);
        if (!this.error) {
          this.title = '';
          this.description = '';
          this.file = null;
          this.$emit('uploadFinished');
        }
      } catch (error) {
        console.log(error);
      }
}
}
};
</script>
