import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.scss'

const Editor = () => {
    const navigate = useNavigate()

    return (
        <div className="editor">
            <span>编辑器</span>
            <Button size="small" onClick={() => navigate('/home')}>
                点击
            </Button>
        </div>
    )
}

export default Editor
