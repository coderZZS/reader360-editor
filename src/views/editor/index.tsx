import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Drawer } from 'antd'
import EditorHeader from './components/EditorHeader'
import './index.scss'
import './reset.module.scss'
import { useState } from 'react'

const Editor = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)

    return (
        <div className="editor">
            <Drawer placement="top" mask={false} open={open} onClose={() => setOpen(false)} closable={false} height={60} className="p-0" contentWrapperStyle={{ padding: 0 }}>
                <EditorHeader />
            </Drawer>
            <div className="editor__content">内容区域</div>
        </div>
    )
}

export default Editor
