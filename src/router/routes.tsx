import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
const Home = lazy(() => import('@/views/home/index.tsx'))
const Editor = lazy(() => import('@/views/editor/index.tsx'))

export const routes: Array<RouteObject> = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/editor',
        element: <Editor />,
    },
]
