import { CustomScene as Scene } from '@/three-utils/three-sdk'
import * as three from 'three'
import type { Mesh } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import img from '@/assets/white-bg.png'
export function useScene() {
    return {
        initVideoScene,
        initMeshScene,
    }
}

function initVideoScene(container: React.MutableRefObject<HTMLElement | null>) {
    if (container.current === null) return
    const scene = new Scene({ container: container.current })
    const video = document.createElement('video')
    video.src = ''
    const videotexture = scene.createFuncs.createVideoTexture(video as HTMLVideoElement)
    const videomaterial = scene.createFuncs.createMeshBasicMaterial({ map: videotexture })
    const sphere = scene.createFuncs.createSphereGeometry({ radius: 500, widthSegments: 100, heightSegments: 100 })
    const sphereMesh = scene.createFuncs.createMesh(sphere, videomaterial)
    sphereMesh.position.set(0, 0, 0)
    scene.scene.add(sphereMesh)

    const box = scene.createFuncs.createBoxGeometry({ w: 20, h: 20, d: 20 })
    const basicMaterial = scene.createFuncs.createMeshBasicMaterial({
        color: new three.Color(0x00ff00),
    })
    const mesh = scene.createFuncs.createMesh(box, basicMaterial)
    mesh.position.set(0, 0, 100)
    const box2 = scene.createFuncs.createBoxGeometry({ w: 20, h: 30, d: 40 })
    const texture = scene.createFuncs.createTexture(img)
    const basicMaterial2 = scene.createFuncs.createMeshBasicMaterial({ map: texture })
    const mesh2 = scene.createFuncs.createMesh(box2, basicMaterial2)
    mesh2.position.set(0, 50, 0)
    scene.scene?.add(mesh)
    scene.scene?.add(mesh2)
    const meshList: Mesh[] = []
    meshList.push(mesh)
    meshList.push(mesh2)
    scene.resetCallback(() => {
        // meshList.map((mesh) => {
        //     mesh.rotation.z += 0.1
        //     mesh.rotation.y += 0.1
        //     mesh.rotation.x += 0.1
        // })
    })
}

function initMeshScene(container: React.MutableRefObject<HTMLElement | null>) {
    if (!container.current) return
    const scene = new Scene({ container: container.current })
    scene.setPointScroll(true)

    scene.setVideoSourceToBg('https://coke-1304800772.cos.ap-chongqing.myqcloud.com/C4Ds/mda-kcfiikcstmqguc02.mp4')
    // const gloader = new GLTFLoader()
    // const dracoLoader = new DRACOLoader()
    // dracoLoader.setDecoderPath('/examples/js/libs/draco/')
    // gloader.setDRACOLoader(dracoLoader)
    // gloader.load(
    //     'https://coke-1304800772.cos.ap-chongqing.myqcloud.com/C4Ds/security_camera.glb',
    //     (gltf) => {
    //         gltf.scene.position.set(0, 0, 0)
    //         gltf.scene.scale.set(100, 100, 100)
    //         scene.scene.add(gltf.scene)

    //         // gltf.animations // Array<THREE.AnimationClip>
    //         // gltf.scene // THREE.Group
    //         // gltf.scenes // Array<THREE.Group>
    //         // gltf.cameras // Array<THREE.Camera>
    //         // gltf.asset // Object
    //     },
    //     (xhr) => {
    //         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    //     }
    // )
    return scene
}
