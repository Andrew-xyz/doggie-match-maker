// Login Page
const PageLogin = () => import("@/pages/PageLogin.vue");
const login = {
  path: "/",
  name: "login",
  component: PageLogin,
  meta: { title: "Doggie Match Maker - Login" },
};

// Dashboard Page
const PageDash = () => import("@/pages/PageDash.vue");
const dash = {
  path: "/dash",
  name: "dash",
  component: PageDash,
  meta: { title: "Doggie Match Maker - Dashboard" },
};

const routes = [login, dash];

export default routes;
