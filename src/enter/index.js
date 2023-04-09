import * as THREE from 'three'

// import '../base/index.css'

import { City } from './city'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const initCity = () => {
    // 获取canvas元素
    const canvas = document.getElementById('webgl')

    // 创建场景
    const scene = new THREE.Scene()

    // 创建相机
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000)
    camera.position.set(1000, 500, 100)
    scene.add(camera)

    // [控制器]
    const controls = new OrbitControls(camera, canvas)

    controls.enableDamping = true // 将其设置为true以启用阻尼（惯性),如果.autoRotate或.enableDamping被设置时，在update循环里调用。
    controls.enableZoom = true // 启用或禁用摄像机的缩放。
    controls.minDistance = 100 // 你能够将相机向内移动多少
    controls.maxDistance = 2000

    // [灯光]
    scene.add(new THREE.AmbientLight(0xadadad)) // AmbientLight 环境光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1) // 平行光（DirectionalLight）
    directionalLight.position.set(0, 0, 0)
    scene.add(directionalLight)

    // [物体]
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // [渲染器]
    const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setSize(window.innerWidth, window.innerHeight)

    /**设置设备像素比。通常用于避免HiDPI设备上绘图模糊
     * window.devicePixelRatio 返回当前显示设备的物理像素分辨率与CSS 像素分辨率之比。此值也可以解释为像素大小的比率：一个 CSS 像素的大小与一个物理像素的大小。简单来说，它告诉浏览器应使用多少屏幕实际像素来绘制单个 CSS 像素。
     */
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.setClearColor(new THREE.Color(0x000000), 1)

    // 渲染城市模型
    const city = new City(scene, camera)

    // 获取渲染时间
    const clock = new THREE.Clock()

    const start = () => {
        city.start(clock.getDelta())
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(start)
    }
    start()

    window.addEventListener('resize', () => {
        // 相机宽高比 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        camera.aspect = window.innerWidth / window.innerHeight

        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
}
