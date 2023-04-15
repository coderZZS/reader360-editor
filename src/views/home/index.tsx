import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import './index.scss'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="home">
            <Header />
            <span>首页</span>
        </div>
    )
}
export default Home
