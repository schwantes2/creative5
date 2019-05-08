<template>
<div id="app" class="app" v-bind:style="{ backgroundImage: 'url('+ getImgUrl() +')'}">
  <Nav/>
  <div class="content">
    <router-view />
  </div>
</div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'app',
  components: {
    Nav,
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
}
</script>

<style>
/* https://color.adobe.com/Ventana-Azul-color-theme-2159606/?showPublished=true */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
  display: flex;
  min-height: 100%;
  background-attachment:fixed;
  /* background-color: #F1F1F1; */
}
body {
  height: 100vh;
}

.content {
  margin: 50px auto;
  display: inline-block;
  align-content: center;
  height: 100%;
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
  margin: 0.5rem;
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
