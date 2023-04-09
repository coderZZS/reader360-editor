import './index.scss'
import { useRoutes } from 'react-router-dom'
import { mainRoutes } from '@/router/routes'

const Home = () => {
    const curRouter = useRoutes(mainRoutes)

    return <div className="home">{curRouter}</div>
}

export default Home
