import './index.scss'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { mainRoutes } from '@/router/routes'
import { Outlet } from 'react-router-dom'

const Home = () => {
    const location = useLocation()
    useEffect(() => {
        return
    }, [location.pathname])
    return (
        <div className="home">
            <Outlet />
        </div>
    )
}

export default Home
