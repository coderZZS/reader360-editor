import './index.scss'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const Home = () => {
    const location = useLocation()
    useEffect(() => {
        console.log(location)
        return
    }, [location.pathname])
    return (
        <div className="main">
            <Outlet />
        </div>
    )
}

export default Home
