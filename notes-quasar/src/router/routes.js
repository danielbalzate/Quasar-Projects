const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageBase.vue") },
      {
        path: "/userProfile",
        component: () => import("pages/PageUserProfile.vue")
      },
      { path: "/users", component: () => import("pages/PageUsers.vue") },
      { path: "/auth", component: () => import("pages/PageAuth.vue") },
      { path: "/notes", component: () => import("pages/PageNotes.vue") },
      {
        path: "/uploadImage",
        component: () => import("pages/PageUploadImage.vue")
      }
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
