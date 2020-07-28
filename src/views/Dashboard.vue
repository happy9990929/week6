<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Dessert</a>
        <button class="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarColor01">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse collapse show" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">回到前台</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/products" class="nav-link">產品列表</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/coupon" class="nav-link">優惠券列表</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/orders" class="nav-link">訂單列表</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/imgStorage" class="nav-link">圖片儲存列表</router-link>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" @click.prevent='logout'>登出</a>
                </li>
            </ul>
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search">
                <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
    <div class="container mt-5">
      <router-view :token='token' v-if='loginSuccess'></router-view>
    </div>
    <footer class="p-3 bg-dark text-white text-center">
        圖片取自 unsplash 無商業用途，僅供學習使用
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: '',
      loginSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    logout() {
      document.cookie = 'mytoken=; expired=';
      this.$router.push('/login');
    },
    checkLogin() {
      // 取得token並驗證
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)mytoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      const api = `${process.env.VUE_APP_APIPATH}auth/check`;
      this.$http.post(api, { api_token: this.token }).then((res) => {
        // 多做確認，避免錯誤
        if (res.data.success) {
          this.loginSuccess = true;
        }
      }).catch((error) => {
        console.log(error);
        this.$router.push('/login');
      });
    },
  },
};
</script>
<style lang="scss">
.container {
    min-height: 500px;
}
</style>
