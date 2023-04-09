import './index.scss'
import { useRoutes } from 'react-router-dom'
import { mainRoutes } from '@/router/routes'
import Header from '@/components/Header'

const Home = () => {
    const curRouter = useRoutes(mainRoutes)

    return <div className="home">{curRouter}</div>
}

export default Home
