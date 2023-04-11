import { color } from '../config'
import * as THREE from 'three'
export class Fly {
    constructor(scene, time) {
        this.scene = scene
        this.time = time

        this.createFly({
            // 起始点
            source: {
                x: 300,
                y: 0,
                z: -200,
            },
            // 终止点
            target: {
                x: -500,
                y: 0,
                z: -240,
            },
            // 飞线长度
            range: 100,
            // 飞线高度
            heigth: 300,
            color: color.fly,
            size: 30,
        })
    }

    createFly(options) {
        const source = new THREE.Vector3(options.source.x, options.source.y, options.source.z) // 起始点
        const target = new THREE.Vector3(options.target.x, options.target.y, options.target.z) // 终止点

        // 通过起始点和终止点计算中心位置
        const center = target.clone().lerp(source, 0.5)
        center.y += options.heigth

        // 计算起点到终点距离
        const len = parseInt(source.distanceTo(target)) // distanceTo 计算该向量到所传入的值的距离。

        // 三维二次贝塞尔曲线
        const currve = new THREE.QuadraticBezierCurve3(source, center, target)

        // 获取粒子
        const points = currve.getPoints(len) //  getPoints 要将曲线划分为的分段数。默认是 5.使用getPoint（t）返回一组divisions+1的点

        const positions = []
        const aPositions = []
        points.forEach((item, index) => {
            positions.push(item.x, item.y, item.z)
            aPositions.push(index)
        })

        const geometry = new THREE.BufferGeometry()
        // TypedBufferAttribute( array : Array, itemSize : Integer, normalized : Boolean )
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute('a_positions', new THREE.Float32BufferAttribute(aPositions, 1))

        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_color: {
                    value: new THREE.Color(options.color),
                },
                u_range: {
                    value: options.range,
                },
                u_size: {
                    value: options.size,
                },
                u_total: {
                    value: len,
                },
                u_time: this.time,
            },
            vertexShader: `
        attribute float a_positions;
        uniform float u_range;
        uniform float u_size;
        uniform float u_time;
        uniform float u_total;
        varying float v_opactiy;

        void main() {
          float size = u_size;
          float total_number = u_total * mod( u_time, 1.0 );\
          float index = ( a_positions + u_range - total_number) / u_range;
          size *= index;
          if( total_number > a_positions && total_number < a_positions + u_range ) {
            v_opactiy = 1.0;
          } else {
            v_opactiy = 0.0;
          }

          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = size / 10.0;
        }
      `,
            fragmentShader: `
      uniform vec3 u_color;
      varying float v_opactiy;
      void main() {
          gl_FragColor = vec4(u_color, v_opactiy);
      }
      `,
            transparent: true,
        })

        const point = new THREE.Points(geometry, material)

        this.scene.add(point)
    }
}
