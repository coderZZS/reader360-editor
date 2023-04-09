import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
const Main = lazy(() => import('@/views/main/index.tsx'))
const Editor = lazy(() => import('@/views/editor/index.tsx'))
const Home = lazy(() => import('@/views/home/index.tsx'))

export const mainRoutes: Array<RouteObject> = [
    {
        path: 'home',
        id: 'home',
        element: <Home />,
    },
    {
        path: 'editor',
        id: 'editor',
        element: <Editor />,
    },
]

export const routes: Array<RouteObject> = [
    {
        path: '/',
        element: <Main />,
        children: mainRoutes,
    },
]
