import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Showcase from "../views/Showcase.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Showcase",
    component: Showcase,
  },
  {
    path: "/search",
    name: "Search",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Search.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
