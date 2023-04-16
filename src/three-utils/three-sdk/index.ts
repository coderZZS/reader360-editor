import * as THREE from 'three'
import type { Raycaster, WebGLRenderer, Light, Scene, PerspectiveCamera, Vector2, Intersection, Object3D, Event, Group, Mesh, Camera, WebGL1Renderer } from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import createThreeElement from './createThreeElement'

export interface TouchEvents {
    touches: Touch[]
}

export interface SceneOption {
    container: HTMLElement
}

export class CustomScene {
    isUserInteracting = false
    onPointerDownPointerX = 0
    onPointerDownPointerY = 0
    onPointerDownLon = 0
    onPointerDownLat = 0
    lon = 0
    lat = 0
    phi = 0
    distance = 50
    theta = 0
    createFuncs = createThreeElement
    container: HTMLElement // 视图容器
    scene!: Scene //场景
    camera!: PerspectiveCamera // 透视相机
    trackballControls!: TrackballControls
    light!: Light // 光源
    render!: WebGLRenderer // 渲染器
    raycaster!: Raycaster // 光线投射
    mouse!: Vector2 // 当前鼠标位置
    selectIntersects!: Intersection<Object3D<Event>>[] // 鼠标悬停的射线列表
    handelIntersects!: Intersection<Object3D<Event>>[] // 点击的射线列表
    selectList!: Array<Mesh | Group> // 鼠标悬停的物体/分组列表
    handelList!: Array<Mesh | Group> // 点击的物体/分组列表
    video?: HTMLVideoElement // 视频对象
    videoIsPlay: boolean = false
    updateCallback: (() => void) | undefined // 更新回调
    constructor(option: SceneOption) {
        this.container = option.container
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        this.init()
    }

    /**
     * 初始化方法，创建基础场景
     */
    private init = (): void => {
        // 创建场景
        this.scene = createThreeElement.createScene()

        // 创建相机并添加至场景
        this.camera = createThreeElement.createPerspectiveCamera({ aspectRatio: this.container.offsetWidth / this.container.offsetHeight })
        this.camera.position.set(0, 0, 0)
        this.scene.add(this.camera)

        // 创建光源
        this.light = createThreeElement.createLight(new THREE.Color(0xffffff))
        this.light.position.set(0, 50, 0)
        this.scene.add(this.light)

        // 创建渲染器
        this.render = createThreeElement.createRender(this.container)
        this.container.appendChild(this.render.domElement)

        // 电脑端事件
        this.render.domElement.onmousemove = this.canvasMouseMove
        this.render.domElement.onmouseup = this.canvasMouseUp
        this.render.domElement.onmousedown = this.canvasMouseDown

        // 移动端事件
        this.render.domElement.ontouchmove = this.canvasMouseMove
        this.render.domElement.ontouchend = this.canvasMouseUp
        this.render.domElement.ontouchstart = this.canvasMouseDown
        window.addEventListener('resize', this.onWindowResize)
        this.animate()
    }

    /**
     * 触摸/点击事件
     * @param event 事件对象
     */
    private canvasMouseDown = (event: TouchEvent | MouseEvent): void => {
        this.isUserInteracting = true

        if ((event as TouchEvent).touches) {
            this.onPointerDownPointerX = (event as TouchEvent).touches[0].clientX
            this.onPointerDownPointerY = (event as TouchEvent).touches[0].clientY
        } else {
            this.onPointerDownPointerX = (event as MouseEvent).clientX
            this.onPointerDownPointerY = (event as MouseEvent).clientY
        }

        this.onPointerDownLon = this.lon
        this.onPointerDownLat = this.lat
    }

    /**
     * 移动事件
     * @param event 事件对象
     */

    private canvasMouseMove = (event: TouchEvent | MouseEvent): void => {
        if ((event as TouchEvent).touches) {
            // this.container.getBoundingClientRect().left 用于纠正精度丢失的问题
            this.mouse.x = (((event as TouchEvent).touches[0].clientX - this.container.getBoundingClientRect().left) / this.container.offsetWidth) * 2 - 1
            this.mouse.y = -(((event as TouchEvent).touches[0].clientY - this.container.getBoundingClientRect().top) / this.container.offsetHeight) * 2 + 1
            if (this.isUserInteracting) {
                this.lon = (this.onPointerDownPointerX - (event as TouchEvent).touches[0].clientX) * 0.1 + this.onPointerDownLon
                this.lat = (this.onPointerDownPointerY - (event as TouchEvent).touches[0].clientY) * 0.1 + this.onPointerDownLat
            }
        } else {
            this.mouse.x = (((event as MouseEvent).clientX - this.container.getBoundingClientRect().left) / this.container.offsetWidth) * 2 - 1
            this.mouse.y = -(((event as MouseEvent).clientY - this.container.getBoundingClientRect().top) / this.container.offsetHeight) * 2 + 1
            if (this.isUserInteracting) {
                this.lon = (this.onPointerDownPointerX - (event as MouseEvent).clientX) * 0.1 + this.onPointerDownLon
                this.lat = (this.onPointerDownPointerY - (event as MouseEvent).clientY) * 0.1 + this.onPointerDownLat
            }
        }
    }

    private canvasMouseUp = (): void => {
        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(this.mouse, this.camera)
        // 计算物体和射线的焦点
        this.handelIntersects = this.raycaster.intersectObjects(this.scene.children)
        this.handelList = this.handelIntersects.map((item) => {
            return this.getGroup(item.object as Mesh) as Mesh | Group
        })
        this.isUserInteracting = false
    }

    private onWindowResize = (): void => {
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight
        this.camera.updateProjectionMatrix()
        this.render.setSize(this.container.offsetWidth, this.container.offsetHeight)
    }

    // 动画
    private animate = (): void => {
        window.requestAnimationFrame(this.animate)
        this.update()
    }

    // 实时更新
    private update = (): void => {
        this.lat = Math.max(-85, Math.min(85, this.lat))
        this.phi = THREE.MathUtils.degToRad(90 - this.lat)
        this.theta = THREE.MathUtils.degToRad(this.lon)
        this.camera.position.x = this.distance * Math.sin(this.phi) * Math.cos(this.theta)
        this.camera.position.y = this.distance * Math.cos(this.phi)
        this.camera.position.z = this.distance * Math.sin(this.phi) * Math.sin(this.theta)
        this.camera.lookAt(0, 0, 0)
        this.runRender()
        this.updateCallback && this.updateCallback()
    }

    // 渲染
    private runRender = (camera?: Camera): void => {
        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(this.mouse, this.camera)
        // 计算物体和射线的焦点
        this.selectIntersects = this.raycaster.intersectObjects(this.scene.children)
        this.selectList = this.selectIntersects.map((item) => {
            return this.getGroup(item.object as Mesh) as Mesh | Group
        })
        this.render.outputEncoding = THREE.sRGBEncoding
        this.render.render(this.scene, camera ? camera : this.camera)
    }
    /**
     * 更新回调
     * @param callback 回调函数
     */
    resetCallback = (callback: () => void): void => {
        this.updateCallback = callback
    }

    /**
     * 根据mesh获取分组
     * @param mesh 物体
     */
    private getGroup = (mesh: Mesh): Mesh | Group => {
        if (mesh.parent?.type === 'Scene') return mesh
        if (mesh.parent?.type === 'Group') return mesh.parent as Group
        return mesh
    }
    /**
     * 设置滚动放大和缩小
     * @param flag
     * @param step
     */
    setPointScroll = (flag: boolean, step = 3): void => {
        interface MyWheelEvent extends WheelEvent {
            wheelDelta: number
        }
        const callback = (e: WheelEvent) => {
            const count = (e as MyWheelEvent).wheelDelta
            let fov = this.camera.fov
            if (count > 0) {
                fov -= step
            } else {
                fov += step
            }
            this.changeCameraSize(fov)
        }
        if (flag) this.render.domElement.addEventListener('wheel', callback)
        else this.render.domElement.removeEventListener('wheel', callback)
    }
    /**
     * 改变相机视野
     * @param fov
     */
    changeCameraSize(fov: number) {
        this.camera.fov = fov
        this.camera.updateProjectionMatrix()
    }
    /**
     * 设置视频源
     * @param url
     */
    setVideoSourceToBg(url: string) {
        if (!this.video) {
            this.video = this.createFuncs.createVideo()
            document.body.appendChild(this.video)
        }
        this.video.src = url
        this.video.onload = () => {
            console.log(this.video)
        }
        const videotexture = this.createFuncs.createVideoTexture(this.video)
        const videomaterial = this.createFuncs.createMeshBasicMaterial({ map: videotexture })
        const sphere = this.createFuncs.createSphereGeometry({ radius: 500, widthSegments: 100, heightSegments: 100 })
        const sphereMesh = this.createFuncs.createMesh(sphere, videomaterial)
        sphereMesh.position.set(0, 0, 0)
        this.scene.add(sphereMesh)
    }
    checkVideoState() {
        if (!this.video) return
        if (this.videoIsPlay) {
            this.video.pause()
        } else {
            this.video.play()
        }
        this.videoIsPlay = !this.videoIsPlay
    }
}
