const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/users", component: () => import("pages/PageUsers.vue") },
      { path: "/auth", component: () => import("pages/PageAuth.vue") },
      { path: "/profile", component: () => import("pages/PageUserProfile.vue") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
