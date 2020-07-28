import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/Index.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue'),
      },
      {
        path: '/Product/:id',
        name: 'Product',
        component: () => import('../views/Product.vue'),
      },
      {
        path: '/Product',
        name: 'Products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('../views/Checkout.vue'),
      },
      {
        path: '/complete',
        name: 'Complete',
        component: () => import('../views/Complete.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/dashboard/Login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('../views/dashboard/Coupon.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/dashboard/Orders.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/dashboard/Products.vue'),
      },
      {
        path: 'imgStorage',
        name: 'ImgStorage',
        component: () => import('../views/dashboard/ImgStorage.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
