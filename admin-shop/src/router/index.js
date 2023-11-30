import { createRouter, createWebHistory } from "vue-router";
// import { authStore } from "../stores/authStore";

const routes = [
  {
    path: "",
    component: () => import("../views/Base.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/Home.vue"),
      }
    ]
  },
  {
    path: "/products",
    component: () => import("../views/Base.vue"),
    children: [
      {
        path: "",
        name: "Products",
        component: () => import("../views/product/ListProduct.vue"),
      },
      {
        path: ":id/edit",
        name: "editProduct",
        component: () => import("../views/product/EditProduct.vue"),
      },
      {
        path:":id/details",
        name : "Product",
        component: ()=> import("../views/product/DetailProduct.vue")
      },
      {
        path:"add",
        name : "addProduct",
        component: ()=> import("../views/product/AddProduct.vue")
      },
      {
        path:":id/addSP",
        name : "addProduct2",
        component: ()=> import("../views/product/AddProduct2.vue")
      },
    ]
  },
  {
    path: "/users",
    component: () => import("../views/Base.vue"),
    children: [
      {
        path: "",
        name: "Users",
        component: () => import("../views/user/ListUser.vue"),
      },
    ]
  },
  {
    path: "/orders",
    component: () => import("../views/Base.vue"),
    children: [
      {
        path: "",
        name: "Orders",
        component: () => import("../views/order/Order.vue"),
      },
      {
        path: ":id/details",
        name: "OrdersDetails",
        component: () => import("../views/order/OrderDetails.vue"),
      },
    ]
  },
  {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login/login.vue"),
      
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login/Register.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router