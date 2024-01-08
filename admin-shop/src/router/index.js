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
        path:"add",
        name : "addProduct",
        component: ()=> import("../views/product/AddProduct.vue")
      },
      {
        path:"addCate",
        name : "addCate",
        component: ()=> import("../views/product/Category.vue")
      },
      {

        path:":id/addSP",
        name : "addProduct2",
        component: ()=> import("../views/product/AddProduct2.vue")
      },
      {

        path:"getall",
        name : "getallto",
        component: ()=> import("../views/product/ProToCate.vue")
      },
      
    ]
  },
  {
    path: "/users",
    component: () => import("../views/Base.vue"),
    children: [
      {
        path: "addNV",
        name: "NV",
        component: () => import("../views/user/AddNV.vue"),
      },
      {
        path: "",
        name: "User",
        component: () => import("../views/user/ListUser.vue"),
      },
      {
        path: ":id/ỏ",
        name: "OrdertoU",
        component: () => import("../views/user/OrdertoUser.vue"),
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
  {
    path: "/chat",
    component: () => import("../views/Chat/ChatLayout.vue"),
    children: [
      {
        path: "",
        name: "Chat",
        component: () => import("../views/Chat/Chat.vue"),
      },
      {
        path: ":userId",
        name: "ChatDetail",
        component: () => import("../views/Chat/Chat.vue"),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router