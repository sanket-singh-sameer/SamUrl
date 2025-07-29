import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree.js"
import HomePage from "../pages/HomePage.jsx"

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage
})
export { homeRoute }