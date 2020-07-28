<template>
  <div>
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
            </div>
        </div>
      </div>
      <div class="d-flex justify-content-center my-3">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{disabled: pagination.current_page === 1}">
              <a class="page-link" href="#"
              @click.prevent="getProducts(pagination.current_page - 1)">Previous</a>
            </li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page">
              <a class="page-link" :class="{active: page === pagination.current_page}" href="#"
              @click.prevent="getProducts(page)">{{page}}</a>
            </li>
            <li class="page-item"
            :class="{disabled: pagination.current_page === pagination.total_pages}">
              <a class="page-link" href="#"
              @click.prevent="getProducts(pagination.current_page + 1)"
              >Next</a>
            </li>
          </ul>
        </nav>
      </div>
  </div>
</template>
<script>
export default {
  props: [
    'token',
  ],
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;
      const loader = this.$loading.show();
      this.$http.get(api).then((res) => {
        loader.hide();
        console.log(res);
        this.products = res.data.data;
        this.pagination = res.data.meta.pagination;
      }).catch((error) => {
        loader.hide();
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
