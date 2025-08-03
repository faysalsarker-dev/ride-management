import { Router } from "express"
import  UserRoute  from "../modules/auth/auth.route"
import  RideRoutes  from "../modules/ride/ride.routes"
import  HistoryRoutes  from "../modules/history/history.route";
import  AdminUserRoutes  from "../modules/admin/admin.route";

export const router = Router()

interface ModuleRoute {
    path: string;
    route: Router;
}

const moduleRoutes: ModuleRoute[] = [
    {
        path: "/user",
        route: UserRoute
    },
    {
        path: "/rides",
        route: RideRoutes
    },
    {
        path: "/history",
        route: HistoryRoutes
    },
    {
        path: "/admin",
        route: AdminUserRoutes
    },
   
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

