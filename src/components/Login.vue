<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Login</h1>
        </div>
        <div class="modal-body">
            <form @submit.prevent="login" class="pure-form pure-form-aligned">
            <fieldset>
              <div class="pure-control-group">
                <label for="username">Username</label>
                <input v-model="username" type="text" placeholder="Username">
              </div>

              <div class="pure-control-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" placeholder="Password">
              </div>

              <div class="pure-controls">
                <button type="button" @click="close" class="pure-button pure-button-primary">Close</button>
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
  name: 'Login',
  props: {
    show: Boolean,
  },
  data() {
    return {
      username:'',
      password:'',
      error: '',
    }
  },
  methods: {
  close() {
    this.$emit('escape');
  },
  async login() {
    try {
      this.error = await this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      });
      if (this.error === ""){
        this.$emit('loginFinished');
        // this.$router.push('mypage');
      }
    } catch (error) {
      console.log(error);
    }
  },
}
};
</script>
