import React from 'react'
import { Button } from 'antd'
import './index.scss'
export default function Header() {
    return (
        <div className="header">
            <h1 className="header__left">名字还没想好</h1>
            <div className="header__right group">
                <span className="header__right--name">用户xxx</span>
                <div className="header__right--handle">
                    <Button danger>退出登陆</Button>
                </div>
            </div>
        </div>
    )
}
