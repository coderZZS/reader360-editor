import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import microApp from '@micro-zoe/micro-app'
import './index.css'
import 'antd/dist/reset.css'
import 'tailwindcss/tailwind.css'
import './style/resets/video.scss'

microApp.start()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

reportWebVitals()
