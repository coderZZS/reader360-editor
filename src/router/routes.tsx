import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import { transitionCustomRouteToRouteObject, CustomRoute } from './utils'
const Main = lazy(() => import('@/views/main/index.tsx'))
const Editor = lazy(() => import('@/views/editor/index.tsx'))
const Home = lazy(() => import('@/views/home/index.tsx'))
const Login = lazy(() => import('@/views/login/index.tsx'))

type CustomRoutesTypes = 'customMainRoutes' | 'customCommonRoutes'

type CustomRoutes = {
    [k in CustomRoutesTypes]: CustomRoute[]
}

export const customRoutes: CustomRoutes = {
    customMainRoutes: [
        {
            path: 'home',
            id: 'home',
            element: <Home />,
            meta: {
                name: 'xxx',
            },
        },
        {
            path: 'editor',
            id: 'editor',
            element: <Editor />,
        },
    ],
    customCommonRoutes: [],
}

export const mainRoutes: Array<RouteObject> = transitionCustomRouteToRouteObject(customRoutes.customMainRoutes)

export const routes: Array<RouteObject> = [
    {
        path: '/',
        element: <Main />,
        children: mainRoutes,
    },
]
