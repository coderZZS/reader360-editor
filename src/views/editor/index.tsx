import { useNavigate, useParams } from 'react-router-dom'
import { Drawer } from 'antd'
import EditorHeader from './components/EditorHeader'
import './index.scss'
import '@/style/resets/index.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useScene } from './indexHook'
import { CustomScene } from '../../three-utils/model-sdk/index'

const Editor = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const { id } = useParams()
    const { initMeshScene, initVideoScene } = useScene()
    const sceneContainer = useRef<HTMLDivElement | null>(null)
    let scene: CustomScene
    useEffect(() => {
        if (!sceneContainer.current || scene) return
        scene = initMeshScene(sceneContainer) as CustomScene
        return
    }, [sceneContainer])

    function dbHandles() {
        scene.checkVideoState()
    }

    const handle = () => {
        console.log(sceneContainer.current)
    }
    return (
        <div className="editor">
            <Drawer placement="top" mask={false} open={open} onClose={() => setOpen(false)} closable={false} height={60} className="p-0" contentWrapperStyle={{ padding: 0 }}>
                <EditorHeader />
            </Drawer>
            <div className="editor__content">
                <div className="scene__ontainer" ref={sceneContainer} onDoubleClick={dbHandles}></div>
            </div>
        </div>
    )
}

export default Editor
