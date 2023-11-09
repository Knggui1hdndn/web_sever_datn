import { createRouter, createWebHistory } from "vue-router";
// import { authStore } from "../stores/authStore";

const routes = [
  {
    path: "",
    name: "Home",
    component: () => import("../views/Home.vue"),
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
        name: "Product",
        component: () => import("../views/product/EditProduct.vue"),
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router