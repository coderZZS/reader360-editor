import React, { Component } from 'react'
import { initCity } from '../../enter'

// 封装组件
class Threejs extends React.Component {
    constructor(props: any) {
        super(props)
    }
    // 组件渲染后调用
    componentDidMount() {
        initCity()
    }

    render() {
        return (
            <div>
                <canvas id="webgl">浏览器不支持canvas, 请更换浏览器</canvas>
            </div>
        )
    }
}

export default Threejs
