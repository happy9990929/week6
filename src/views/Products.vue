<template>
  <div class="row my-5">
    <div class="col-md-4" v-for="product in products" :key="product.id">
        <div class="card">
            <div class="card-body">
                <div class="productImg"
                :style="`background-image:url(${product.imageUrl})`"></div>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{product.title}}</h5>
                <p class="card-text">{{product.content}}</p>
            </div>
            <div class="card-body">
                <span class="h2 text-danger mr-2">NT$ {{product.price}}</span>
                <span class="h5 org text-black-50">NT$ {{product.origin_price}}</span>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-warning"
                @click="addCart(product)">加入購物車</button>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: {},
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`;
      const loader = this.$loading.show();
      this.$http
        .get(api)
        .then((res) => {
          loader.hide();
          this.products = res.data.data;
        })
        .catch((error) => {
          loader.hide();
          // eslint-disable-next-line
          console.log(error);
        });
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(api).then((res) => {
        this.cart = res.data.data;
        this.cartTotal = this.cart.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    },
    addCart(item, quantity = 1) {
      const cart = {
        product: item.id,
        quantity,
      };
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.post(api, cart).then(() => {
        this.getCart();
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.productImg {
  width: 100%;
  height: 300px;
  background-position: center center;
  background-size: cover;
}
</style>
