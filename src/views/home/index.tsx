import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="home">
            <span>首页</span>
            <Button onClick={() => navigate('/editor')}>编辑器</Button>
        </div>
    )
}
export default Home
