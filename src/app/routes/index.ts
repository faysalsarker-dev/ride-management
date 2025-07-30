import { Router } from "express"
import  UserRoute  from "../modules/auth/auth.route"
import  RideRoutes  from "../modules/ride/ride.routes"

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
        path: "/ride",
        route: RideRoutes
    },
   
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

