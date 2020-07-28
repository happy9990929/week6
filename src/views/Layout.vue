<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand" href="#">Dessert</router-link>
        <button class="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarColor01">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse collapse show" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">首頁</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link">關於我們</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/product" class="nav-link">產品列表</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/cart" class="nav-link">購物車</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/checkout" class="nav-link">結帳</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/complete" class="nav-link">完成訂單</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/products" class="nav-link">後台購物車列表</router-link>
                </li>
            </ul>
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search">
                <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
    <div class="container mt-5">
      <router-view></router-view>
    </div>
    <footer class="p-3 bg-dark text-white text-center">
        圖片取自 unsplash 無商業用途，僅供學習使用
    </footer>
  </div>
</template>
<style lang="scss">
.container {
    min-height: 500px;
}
</style>
