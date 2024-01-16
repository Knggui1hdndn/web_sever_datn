import { createRouter, createWebHistory } from "vue-router";
// import { authStore } from "../stores/authStore";
import {  isAdmin, isMember } from "../utils/authUtils";



const routes = [
  {
    path: "",
    component: () => import("../views/Base.vue"),
        meta: { requiresAdmin: true },

    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/Home.vue"),
        meta: { requiresAuth: true }, // Example: requires authentication

      }
    ]
  },
  
  {
    path: "/products",
    meta: { requiresAdmin: true },
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
        path:":id/pro",
        name : "getallto",
        component: ()=> import("../views/product/ProToCate.vue")
      },
      
    ]
  },
  {
    path: "/users",
    meta: { requiresAdmin: true },
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
        path: ":id/ordertoU",
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
        component: () => import("../views/order/OrderDetails.vue"),
      },
    ]
  },
  {
        path: "/membership",
        meta: { requiresAdmin: true },

        component: () => import("../views/Base.vue"),
        children: [
          {
            path :"",
            name : "Nhanvien",
            component: () => import("../views/membership/MemberShip.vue"),

          },
          {
            path :":id/detail",
            name : "Nhanviena",
            component: () => import("../views/membership/Detail.vue"),

          },

        ]
      
  },
  {
    path: "/login",
    name: "a",
    component: () => import("../views/Login/login.vue"),
  
},
  {
    path: "/register",
    name: "register",
    component: () =>
      import( "../views/Login/Register.vue"),
  },
  {
    path: "/chat",
    component: () => import("../views/Base.vue"),
    children: [
      
        {
          path: "",
          name: "Chat1",
          component: () => import("../views/Chat/ChatLayout.vue"),
        },

      
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
const getUserRole = () => {
  return localStorage.getItem("role");
};


router.beforeEach((to, from, next) => {
  const userRole = getUserRole();

  if (to.meta.requiresAuth && !userRole) {
    next('/login');
  } else if (to.meta.requiresAdmin && userRole !== "ADMIN") {
    next('/orders');
  } else if (to.meta.requiresMember && userRole !== "MEMBER") {
    next('');
  } else {
    next();
  }
});

export default router;