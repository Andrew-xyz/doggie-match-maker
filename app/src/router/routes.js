// Login Page
const PageLogin = () => import("@/pages/PageLogin.vue");
const login = {
  path: "/",
  name: "Login",
  component: PageLogin,
  meta: { title: "Doggie Match Maker - Login" },
};

const routes = [login];

export default routes;
