<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Upload</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <input v-model="title" placeholder="Title">
            <p></p>
            <textarea v-model="description" placeholder="Description"></textarea>
            <p></p>
            <input type="file" name="chefPhoto" @change="chefFileChanged">
            <p></p>
            <input type="file" name="myPhoto" @change="myFileChanged">
            <p></p>
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Upload</button>
          </form>
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
      chefFile: null,
      myFile: null,
      error: '',
    }
  },
  methods: {
  chefFileChanged(event) {
    this.chefFile = event.target.files[0]
  },
  myFileChanged(event) {
    this.myFile = event.target.files[0]
  },
  close() {
    this.$emit('escape');
  },
  async upload() {
      try {
        const formData = new FormData();
        formData.append('chefPhoto', this.chefFile, this.chefFile.name);
        formData.append('myPhoto', this.myFile, this.myFile.name);
        formData.append('title', this.title);
        formData.append('description', this.description);
        this.error = await this.$store.dispatch("upload", formData);
        if (!this.error) {
          this.title = '';
          this.description = '';
          this.chefFile = null;
          this.myFile = null;
          this.$emit('uploadFinished');
        }
      } catch (error) {
        console.log(error);
      }
}
}
};
</script>
