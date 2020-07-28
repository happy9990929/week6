<template>
  <div>
      <h2>{{product.title}}</h2>
      {{product.description}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {},
    };
  },
  created() {
    const { id } = this.$route.params;
    const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`;
    const loader = this.$loading.show();
    this.$http.get(api).then((res) => {
      loader.hide();
      // eslint-disable-next-line
      console.log(res);
      this.product = res.data.data;
    }).catch((error) => {
      loader.hide();
      // eslint-disable-next-line
      console.log(error);
    });
  },
};
</script>
