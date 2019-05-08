<template>
<div class="Nav">
  <link href="https://fonts.googleapis.com/css?family=Dancing+Script" rel="stylesheet">
  <div class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">TS</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="/"> Culinary </a>
        </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <div v-if="user">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="/mypage"> {{user.name}} </a>
          </li>
          <li class="nav-item">
            <a @click="toggleUpload"><i class="far fa-image"></i></a>
          </li>
          <li class="nav-item">
            <a href="/" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a @click="toggleLogin"> Login </a>
          </li>
          <li class="nav-item">
            <a @click="toggleRegister"> Register </a>
          </li>
        </ul>
      </div>
    </ul>
    <escape-event @escape="escape"></escape-event>
    <login :show="showLogin" @escape="escape" @loginFinished="loginFinished" />
    <register :show="showRegister" @escape="escape" @registerFinished="registerFinished" />
    <uploader :show="showUpload" @escape="escape" @uploadFinished="uploadFinished" />
    </nav>
  </div>
</div>
</template>

<script>
import EscapeEvent from '@/components/EscapeEvent.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Uploader from '@/components/Uploader.vue'

export default {
  name: 'Nav',
  components: {
    EscapeEvent,
    Login,
    Register,
    Uploader,
  },
  data() {
    return {
      window: {
        width: 10,
        height: 10
      },
      url:"",
      pic:"",
      showLogin: false,
      showRegister: false,
      showUpload: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
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
    getImgUrl() {
       return "https://picsum.photos/"+this.window.width+"/"+this.window.height+"/?random";
      // return "https://picsum.photos/"+2500+"/"+1500;
    },
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
        this.showLogin = false;
        this.showRegister = false;
        this.showUpload = false;
    },
    toggleLogin() {
      this.showLogin = true;
    },
    loginFinished() {
       this.showLogin = false;
    },
    toggleRegister() {
      this.showRegister = true;
    },
    registerFinished() {
       this.showRegister = false;
    },
    toggleUpload() {
      this.showUpload = true;
    },
    uploadFinished(){
      this.showUpload = false;
    },
  },
}
</script>

<style scoped>
/* NAVIGATION BAR*/

.nav-item a{
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  margin-right: 1.5rem;
}
.nav-item a:hover{
  color: grey;
}

.navbar-brand {
    display: inline-block;
    border-style: solid;
    border-radius: 0.5rem;
    border-width: 0.05rem;
    padding-left: .6125rem;
    padding-right: .6125rem;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
}

/* Dropdown Button */
.dropbtn {
  background-color: inherit;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 10px;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border-radius: 10px;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #E0E0E0;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {background-color: #333;}

/*End NAVIGATION BAR */

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
