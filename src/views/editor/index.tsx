import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Drawer } from 'antd'
import EditorHeader from './components/EditorHeader'
import './index.scss'
import '@/style/resets/index.module.scss'
import { useState } from 'react'

const Editor = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const { id } = useParams()

    return (
        <div className="editor">
            <Drawer placement="top" mask={false} open={open} onClose={() => setOpen(false)} closable={false} height={60} className="p-0" contentWrapperStyle={{ padding: 0 }}>
                <EditorHeader />
            </Drawer>
            <div className="editor__content"></div>
        </div>
    )
}

export default Editor
