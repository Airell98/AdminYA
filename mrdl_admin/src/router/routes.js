const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      // { path: "/create", component: () => import("pages/Create.vue") },
      { path: "/createPPT", component: () => import("pages/CreatePPT.vue") },
    
      { path: "/table/:module", component: () => import("pages/Tables.vue") },
      { path: "/module_setting/:module", component: () => import("pages/ActivateModule.vue") },
    ]
  },
  //CreatePPT.vue
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/niceSideBar",
    component: ()=>import("pages/NiceSideBar.vue")
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
