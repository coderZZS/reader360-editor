import './index.scss'
import { Button } from 'antd'
export default () => {
    return (
        <div className="header">
            <h1 className="header__left">名字还没想好</h1>
            <div className="header__right">
                <span className="header__right--name">用户xxx</span>
                <div className="header__right--handle">
                    <Button danger>退出登陆</Button>
                </div>
            </div>
        </div>
    )
}
