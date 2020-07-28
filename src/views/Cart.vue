<template>
  <div class="my-5 row justify-content-center">
    <div class="col-md-6">
      <div class="text-right mb-3">
          <button type="button" class="btn btn-outline-danger btn-sm" @click="removeAllCartItem">
              <i class="far fa-trash-alt"></i>刪除所有品項
          </button>
      </div>
      <table class="table">
        <thead>
            <tr>
                <th>刪除</th>
                <th>品名</th>
                <th width="150px">數量</th>
                <th>單位</th>
                <th>單價</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in cart" :key="item.id+i">
            <td class="align-middle">
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(item.product.id)">
              <font-awesome-icon icon="far fa-trash-alt" />
              </button>
            </td>
            <td class="align-middle">
                {{item.product.title}}
            </td>
            <td class="align-middle">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-primary"
                        @click="quantityUpdata(item.product.id, item.quantity + 1)">
                            +
                        </button>
                    </div>
                    <input type="text" class="form-control text-center" :value="item.quantity">
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary"
                        @click="quantityUpdata(item.product.id, item.quantity - 1)">
                            -
                        </button>
                    </div>
                </div>
            </td>
            <td class="align-middle">
                {{item.product.unit}}
            </td>
            <td class="align-middle text-right">
                NT$ {{item.product.price}}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right">
                總計
            </td>
            <td class="text-right">
                {{cartTotal}}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cart: {},
      cartTotal: 0,
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      const loader = this.$loading.show();
      this.$http.get(api).then((res) => {
        loader.hide();
        this.cart = res.data.data;
        this.cartTotal = this.cart.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
      }).catch((error) => {
        loader.hide();
        console.log(error);
      });
    },
    quantityUpdata(id, num) {
      const cart = {
        product: id,
        quantity: num,
      };
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      const loader = this.$loading.show();
      this.$http.patch(api, cart).then(() => {
        loader.hide();
        this.getCart();
      }).catch((error) => {
        loader.hide();
        console.log(error);
      });
    },
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      const loader = this.$loading.show();
      this.$http.delete(api).then(() => {
        loader.hide();
        this.getCart();
      }).catch((error) => {
        loader.hide();
        console.log(error);
      });
    },
    removeAllCartItem() {
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      const loader = this.$loading.show();
      this.$http.delete(api).then(() => {
        loader.hide();
        this.getCart();
      }).catch((error) => {
        loader.hide();
        console.log(error);
      });
    },
  },
};
</script>
