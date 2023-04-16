import * as THREE from 'three'
import type {
    OrthographicCamera,
    PerspectiveCamera,
    SphereGeometry,
    BoxGeometry,
    CircleGeometry,
    BufferGeometry,
    Mesh,
    Light,
    WebGLRenderer,
    ConeGeometry,
    VideoTexture,
    Texture,
    MeshBasicMaterial,
    Material,
    Color,
    Scene,
} from 'three'

import { OrbitControls } from 'three-orbitcontrols-ts'

// 创建场景
export const createScene = (): Scene => {
    return new THREE.Scene()
}

interface PerspectiveCameraOption {
    fov?: number // 视距
    aspectRatio?: number // 长宽比
    near?: number // 近截面
    far?: number // 远截面
}
/**
 * 创建透视相机
 * @param option 配置参数
 * @returns 透视相机
 */
export const createPerspectiveCamera = ({ fov = 70, aspectRatio = 1.77, near = 0.1, far = 10000 }: PerspectiveCameraOption): PerspectiveCamera => {
    return new THREE.PerspectiveCamera(fov, aspectRatio, near, far)
}

/**
 * 创建轨道控制器
 * @param camera 相机
 * @param canvas canvas
 * @returns 控制器
 */
export const createOrbitControls = (camera: PerspectiveCamera, canvas: HTMLElement): OrbitControls => {
    const controls = new OrbitControls(camera, canvas)
    return controls
}

/**
 * 创建正交相机
 * @param canvas renderDom
 * @param frustumSize 截面大小
 * @param near 近端面
 * @param far 远端面
 * @returns 正交相机
 */
export const createOrthographicCamera = (canvas: HTMLElement, frustumSize = 400, near = 1, far = 10000): OrthographicCamera => {
    const aspect = canvas.offsetWidth / canvas.offsetHeight
    return new THREE.OrthographicCamera((frustumSize * aspect) / -2, (frustumSize * aspect) / 2, frustumSize / 2, frustumSize / -2, near, far)
}

// 创建
interface SphereGeometryOption {
    radius?: number // 半径
    widthSegments?: number // 水平分段
    heightSegments?: number // 垂直分段
    isGeometry?: boolean // 是否是球体 默认值为true 不是球体则为内缩放
}

/**
 * 创建球体
 * @param option 参数对象
 * @returns 球体
 */
export const createSphereGeometry = ({ radius = 500, widthSegments = 100, heightSegments = 100, isGeometry = false }: SphereGeometryOption): SphereGeometry => {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    if (!isGeometry) {
        geometry.scale(-1, 1, 1)
    }
    return geometry
}

/**
 * 创建矩形几何体
 * @param _size 大小
 * @returns 矩形几何体
 */
export interface BoxSizeOption {
    w?: number
    h?: number
    d?: number
}
export const createBoxGeometry = ({ w = 1, h = 1, d = 1 }: BoxSizeOption): BoxGeometry => {
    return new THREE.BoxGeometry(w, h, d)
}

/**
 * 创建圆形几何体
 * @param option 配置参数
 * @returns 圆形几何体
 */
export interface CircleGeometryOption {
    radius?: number
    segments?: number
}
export const createCircleGeometry = ({ radius = 10, segments = 32 }: CircleGeometryOption): CircleGeometry => {
    return new THREE.CircleGeometry(radius, segments)
}

/**
 * 创建圆锥几何体
 * @param option 配置参数
 * @returns 圆锥几何体
 */
export interface ConeGeometryOption {
    radius?: number
    height?: number
    segments?: number
}
export const createConeGeometry = ({ radius = 10, height = 20, segments = 32 }: ConeGeometryOption): ConeGeometry => {
    return new THREE.ConeGeometry(radius, height, segments)
}

/**
 * 创建视频贴图
 * @param video video dom
 * @returns 视频贴图
 */
export const createVideoTexture = (video: HTMLVideoElement): VideoTexture => {
    return new THREE.VideoTexture(video)
}

/**
 * 创建贴图
 * @param imgUrl 图片
 * @returns 贴图
 */
export const createTexture = (imgUrl: string): Texture => {
    return new THREE.TextureLoader().load(imgUrl)
}

/**
 * 创建材质
 * @param texture 贴图
 * @returns 材质
 */
export interface CreateMeshBasicMaterialOption {
    map?: Texture
    color?: Color
}
export const createMeshBasicMaterial = (option: CreateMeshBasicMaterialOption): MeshBasicMaterial => {
    return new THREE.MeshBasicMaterial(option)
}

/**
 * 创建物体
 * @param geometry 几何体
 * @param material 材质
 * @returns 物体
 */
export const createMesh = (geometry: BufferGeometry, material: Material): Mesh => {
    return new THREE.Mesh(geometry, material)
}

/**
 * 创建光源
 * @param color 颜色 例如(0xffffff)
 * @returns 光源
 */
export const createLight = (color: Color): Light => {
    return new THREE.AmbientLight(color)
}

/**
 * 创建渲染器
 * @param container 父容器
 * @returns render渲染器
 */
export const createRender = (container: HTMLElement): WebGLRenderer => {
    const render = new THREE.WebGLRenderer()
    // render.setPixelRatio(window.devicePixelRatio);
    render.setSize(container.offsetWidth, container.offsetHeight)
    return render
}

export function createVideo() {
    const video = document.createElement('video')
    video.crossOrigin = '*'
    video.autoplay = true
    return video
}

export default {
    createVideo,
    createScene,
    createPerspectiveCamera,
    createSphereGeometry,
    createVideoTexture,
    createTexture,
    createMeshBasicMaterial,
    createMesh,
    createLight,
    createRender,
    createBoxGeometry,
    createCircleGeometry,
    createConeGeometry,
    createOrbitControls,
    createOrthographicCamera,
}
