import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import { transitionCustomRouteToRouteObject, CustomRoute } from './utils'
const Main = lazy(() => import('@/views/main/index.tsx'))
const Editor = lazy(() => import('@/views/editor/index.tsx'))
const Home = lazy(() => import('@/views/home/index.tsx'))

const customRoutes: CustomRoute[] = [
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
]

export const mainRoutes: Array<RouteObject> = transitionCustomRouteToRouteObject(customRoutes)

export const routes: Array<RouteObject> = [
    {
        path: '/',
        element: <Main />,
        children: mainRoutes,
    },
]
