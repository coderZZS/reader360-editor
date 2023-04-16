import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { transitionCustomRouteToRouteObject, CustomRoute } from './utils'
const Main = lazy(() => import('@/views/main/index.tsx'))
const Editor = lazy(() => import('@/views/editor/index.tsx'))
const Home = lazy(() => import('@/views/home/index.tsx'))
const Login = lazy(() => import('@/views/login/index.tsx'))
const Threejs = lazy(() => import('@/views/threejs/index.tsx'))

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
            path: 'editor/:id',
            id: 'editor',
            element: <Editor />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/three',
            element: <Threejs />,
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
