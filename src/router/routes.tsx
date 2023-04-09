import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
const Main = lazy(() => import('@/views/main/index.tsx'))
const Editor = lazy(() => import('@/views/editor/index.tsx'))
const Home = lazy(() => import('@/views/home/index.tsx'))
const Threejs = lazy(() => import('@/views/threejs/index.tsx'))

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
    {
        path: '/Threejs',
        element: <Threejs />,
    },
]

export const routes: Array<RouteObject> = [
    {
        path: '/',
        element: <Main />,
        children: mainRoutes,
    },
]
