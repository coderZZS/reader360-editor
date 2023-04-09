import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="home">
            <span>首页</span>
            <Button onClick={() => navigate('/editor', { state: 'aaa' })}>编辑器</Button>
            <div className="hello">789</div>
        </div>
    )
}
export default Home
