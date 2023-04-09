import { Button } from 'antd'
import './index.scss'

export default () => {
    return (
        <div className="editor-header">
            <div className="editor-header__left">作品标题...</div>
            <div className="editor-header__right">
                <Button danger type="dashed" ghost>
                    删除
                </Button>
                <Button type="dashed" ghost>
                    保存
                </Button>
                <Button type="dashed" ghost>
                    发布
                </Button>
            </div>
        </div>
    )
}
