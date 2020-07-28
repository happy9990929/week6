<template>
  <div class="container">
    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          id="inputEmail"
          v-model="user.email"
          type="email"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
        />
      </div>
      <div class="form-group">
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          id="inputPassword"
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
      <button class="btn btn-lg btn-outline-primary btn-block" type="button"
      @click="logout">登出</button>
      <!-- <button class="btn btn-lg btn-outline-primary btn-block" type="button"
      @click="getData">取得資料</button> -->
      <p class="mt-5 mb-3 text-muted">&copy; 2020~∞ - 六角學院</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
    };
  },
  methods: {
    login() {
      const api = `${process.env.VUE_APP_APIPATH}auth/login`;
      const loader = this.$loading.show();
      this.$http.post(api, this.user).then((res) => {
        loader.hide();
        const { expired } = res.data;
        const { token } = res.data;
        document.cookie = `mytoken=${token}; expired=${new Date(expired * 1000)}`;
        this.$router.push('/admin/products');
      }).catch((error) => {
        loader.hide();
        // eslint-disable-next-line
        console.log(error);
      });
    },
    logout() {
      document.cookie = 'mytoken=; expired=';
    },
  },
};
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
