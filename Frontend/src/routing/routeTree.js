import { createRootRoute, createRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout.jsx";
import { homeRoute } from "./home.route.js";
import { dashboardRoute } from "./dashboard.route.js";
import { authRoute } from "./auth.route.js";

const rootRoute = createRootRoute({
  component: RootLayout,
});
const routeTree = rootRoute.addChildren([homeRoute, dashboardRoute, authRoute]);

export { routeTree, rootRoute };
