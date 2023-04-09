import { RouteObject } from 'react-router-dom'
interface CustomMeta {
    name?: string
}

interface CustomRouteObject {
    meta?: CustomMeta
}

export type CustomRoute = RouteObject | CustomRouteObject

export function transitionCustomRouteToRouteObject(routes: CustomRoute[]): RouteObject[] {
    return routes.map((route) => {
        let ret = {}
        if ('path' in route) {
            const { caseSensitive, path, id, loader, action, hasErrorBoundary, shouldRevalidate, handle, index, children, element, errorElement, Component, ErrorBoundary, lazy } = route
            ret = {
                caseSensitive,
                path,
                id,
                loader,
                action,
                hasErrorBoundary,
                shouldRevalidate,
                handle,
                index,
                children,
                element,
                errorElement,
                Component,
                ErrorBoundary,
                lazy,
            }
        }
        return ret
    })
}
