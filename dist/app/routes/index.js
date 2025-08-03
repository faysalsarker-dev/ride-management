"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const ride_routes_1 = __importDefault(require("../modules/ride/ride.routes"));
const history_route_1 = __importDefault(require("../modules/history/history.route"));
const admin_route_1 = __importDefault(require("../modules/admin/admin.route"));
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: auth_route_1.default
    },
    {
        path: "/rides",
        route: ride_routes_1.default
    },
    {
        path: "/history",
        route: history_route_1.default
    },
    {
        path: "/admin",
        route: admin_route_1.default
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
