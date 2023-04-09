import React from 'react'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import 'antd/dist/reset.css'

function App() {
    return (
        <React.Suspense fallback={<h3>loading...</h3>}>
            <RouterProvider router={router}></RouterProvider>
        </React.Suspense>
    )
}

export default App
