import * as TWEEN from '@tweenjs/tween.js'
import { loadFBX } from '../utils/index'
import { SurroundLine } from '../effect/surroundline'
import { Background } from '../effect/background'
import { Radar } from '../effect/radar'
import { Wall } from '../effect/wall'
import { Circle } from '../effect/circle'
import { Ball } from '../effect/ball'
import { Cone } from '../effect/cone'
import { Fly } from '../effect/fly'

import * as THREE from 'three'

export class City {
    constructor(scene, camera, time) {
        this.tweenPosition = null
        this.tweenRotation = null
        this.scene = scene
        this.camera = camera
        ;(this.time = {
            value: 0,
        }),
            (this.top = {
                value: 0,
            })
        this.flag = false

        this.height = {
            value: 5,
        }
        this.loadCity()
    }
    /**
     *  加载模型
     */
    loadCity() {
        const path = require('../model/beijing.fbx')
        loadFBX(path).then((object) => {
            object.traverse((child) => {
                if (child.isMesh) {
                    new SurroundLine(this.scene, child, this.height, this.time)
                }
            })
            this.initEffect()
            this.clickEvent()
        })
    }

    // 加载纹理
    initEffect() {
        new Background(this.scene)
        new Radar(this.scene, this.time)
        new Wall(this.scene, this.time)
        new Circle(this.scene, this.time)
        new Ball(this.scene, this.time)
        new Cone(this.scene, this.top, this.height)
        new Fly(this.scene, this.time)

        this.addClick()
    }

    addClick() {
        let flag = true
        document.onmousedown = () => {
            flag = true

            document.onmousemove = () => {
                flag = false
            }
        }

        document.onmouseup = (event) => {
            if (flag) {
                this.clickEvent(event)
            }
            document.onmousemove = null
        }
    }

    // 点击选择物体
    clickEvent(event) {
        if (event) {
            // 获取到浏览器坐标
            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1

            // 创建设备坐标（三维）
            const standardVector = new THREE.Vector3(x, y, 0.5)

            // 转化为世界坐标
            const worldVector = standardVector.unproject(this.camera)

            // 做序列化
            const ray = worldVector.sub(this.camera.position).normalize()

            // 如何实现点击选中
            // 创建一个射线发射器，用来发射一条射线
            const raycaster = new THREE.Raycaster(this.camera.position, ray)

            // 返回射线碰撞到的物体
            const intersects = raycaster.intersectObjects(this.scene.children, true)
            let point3d = null
            if (intersects.length) {
                point3d = intersects[0]
            }
            if (point3d) {
                const time = 1000
                const proportion = 3

                this.tweenPosition = new TWEEN.Tween(this.camera.position)
                    .to(
                        {
                            x: point3d.point.x * 1.5,
                            y: point3d.point.y * 2,
                            z: point3d.point.z * 1.5,
                        },
                        time
                    )
                    .start()

                this.tweenRotation = new TWEEN.Tween(this.camera.rotation)
                    .to(
                        {
                            x: this.camera.rotation.x,
                            y: this.camera.rotation.y,
                            z: this.camera.rotation.z,
                        },
                        time
                    )
                    .start()
            }
        }
    }

    start(delta) {
        if (this.tweenPosition && this.tweenRotation) {
            this.tweenPosition.update()
            this.tweenRotation.update()
        }

        this.time.value += delta

        this.height.value += 0.4
        if (this.height.value > 160) {
            this.height.value = 5
        }

        if (this.top.value > 15 || this.top.value < 0) {
            this.flag = !this.flag
        }
        this.top.value += this.flag ? -0.4 : 0.4
    }
}
