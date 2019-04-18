<template>
<div class="main">
  <div class="fixed-top">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="/">TS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <ul class="navbar-nav">
    <li class="nav-item">
      <a @click="toggleUpload" class="pure-button">Login </a>
      <!-- <a href="#" @click="logout" class="pure-button">Register </a> -->
      <router-link to="/register" class="pure-button">Register</router-link> or
      <!-- <router-link to="/uploader" class="pure-button">Login</router-link> -->
    </li>
  </ul>
  <escape-event @escape="escape"></escape-event>
  <uploader :show="show" @escape="escape" @upload-finished="uploadFinished" />
</nav>
</div>

  <img :src="getImgUrl(pic)" v-bind:alt="pic">
  <!-- <div>
    <div v-if="user">
      <div class="header">
        <div>
          <h1>{{user.name}}</h1>
        </div>
        <div>
          <p>
            <a @click="toggleUpload"><i class="far fa-image"></i></a>
            <a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
          </p>
        </div>
      </div>
      <escape-event @escape="escape"></escape-event>
      <uploader :show="show" @escape="escape" @upload-finished="uploadFinished" />
    </div>
    <div v-else>
      <p>If you would like to upload photos, please register for an account or login.</p>
      <router-link to="/register" class="pure-button">Register</router-link> or
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div> -->
</div>
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
import EscapeEvent from '@/components/EscapeEvent.vue'
import Uploader from '@/components/Uploader.vue'

export default {
  name: 'main',
  components: {
    EscapeEvent,
    Uploader,
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      url:"",
      pic:"",
      show:false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    photos() {
      return this.$store.state.photos;
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyPhotos");
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    getURL(){
      this.url = "https://picsum.photos/" + this.window.width + "/" + this.window.height +"/?random";
    },
    getImgUrl(pet) {
      return "https://picsum.photos/"+this.window.width+"/"+this.window.height+"/?random"
    },
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
       this.show = false;
       try {
         this.error = await this.$store.dispatch("getMyPhotos");
       } catch (error) {
         console.log(error);
       }
     },
  }
}
</script>
