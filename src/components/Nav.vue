<template>
<!-- <div id="app" class="app" v-bind:style="{ backgroundImage: 'url('+ getImgUrl() +')'}"> -->
<div id="app" class="app">
<link href="https://fonts.googleapis.com/css?family=Dancing+Script" rel="stylesheet">
<div class="fixed-top">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="/">TS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <ul class="navbar-nav">
    <li class="nav-item">
      <!-- <a @click="toggleUpload" class="pure-button">Login </a> -->
      <!-- <a href="#" @click="logout" class="pure-button">Register </a> -->
      <a href="/"> Culinary </a>
    </li>

      <!-- <router-link to="/login" class="pure-button">Login</router-link> -->
      <!-- <router-link to="/register" class="pure-button">Register</router-link> -->
      <!-- <router-link to="/uploader" class="pure-button">Login</router-link> -->
    </li>
  </ul>
  <ul class="navbar-nav ml-auto">
    <div v-if="user">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a href="/mypage"> {{user.name}} </a>
        </li>
        <!-- <li class="nav-item"> -->
          <!-- <a href="/" @click="logout"><i class="fas fa-sign-out-alt"></i></a> -->
        <!-- </li> -->
      </ul>
    </div>
    <div v-else>
      <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/login"> Login </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/register"> Register </router-link>
      </li>
      </ul>
    </div>
          </ul>
  <!-- <escape-event @escape="escape"></escape-event> -->
  <!-- <uploader :show="show" @escape="escape" @upload-finished="uploadFinished" /> -->
</nav>
</div>
  <div class="content">
    <router-view />
  </div>
</div>
</template>

<style>
/* NAVIGATION BAR*/
.content {
  margin: 50px auto;
  display: inline-block;
  align-content: center;
  height: 100%;
}

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

/* https://color.adobe.com/Ventana-Azul-color-theme-2159606/?showPublished=true */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
  display: flex;
  min-height: 100%;
  /* background-attachment:fixed; */
  /* background-color: #F1F1F1; */
}

body {
  height: 100vh;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  /* https://css-tricks.com/box-sizing/ */
}

.error {
  color: #F2385A;
}

.pure-button-primary {
  background-color: #36B1BF;
}

/* Modals */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h1 {
  margin-bottom: 30px;
  font-size: 1.5em;
}

.modal-body {
  margin: 0;
}

.modal-body input {
  margin-bottom: 20px;
  height: 30px;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.modal-default-button {
  float: right;
}

/*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>

<script>

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      window: {
        width: 10,
        height: 10
      },
      url:"",
      pic:"",

    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyPhotos");
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
  },
  async logout() {
    try {
      this.error = await this.$store.dispatch("logout");
    } catch (error) {
      console.log(error);
    }
  },
}
</script>
