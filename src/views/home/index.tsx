import { useNavigate } from 'react-router-dom'
import './index.scss'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="home">
            <span>首页</span>
        </div>
    )
}
export default Home
