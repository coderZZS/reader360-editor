import { RouteObject } from "react-router-dom";

export const routes: Array<RouteObject> = [
  {
    path: "home",
    lazy: () => import("../views/home/index.tsx"),
  },
];
