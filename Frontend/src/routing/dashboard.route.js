import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import DashBoardPage from "../pages/DashBoardPage"
import { checkAuth } from "../utils/helper"

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashBoardPage,
beforeLoad: checkAuth,
})
export { dashboardRoute }