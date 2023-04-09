import * as THREE from 'three'
import { color } from '../config/index'

export class SurroundLine {
    constructor(scene, child, height, time) {
        this.scene = scene
        this.child = child

        this.meshColor = color.mesh // 模型底部颜色
        this.headhColor = color.head // 模型顶部颜色

        this.height = height
        this.time = time

        this.creatMesh()

        /**
         * 创建建筑外层线条
         */
        this.createLine()
    }

    /**
     * 动态获取高度
     */

    computedMesh() {
        // 计算当前几何体的的边界矩形，该操作会更新已有 [param:.boundingBox]。边界矩形不会默认计算，需要调用该接口指定计算边界矩形，否则保持默认值 null。
        this.child.geometry.computeBoundingBox()
        this.child.geometry.computeBoundingSphere()
    }

    creatMesh() {
        this.computedMesh()

        // 动态获取建筑高度差
        const { max, min } = this.child.geometry.boundingBox
        const size = max.z - min.z

        const material = new THREE.ShaderMaterial({
            uniforms: {
                // 传递给片元着色器变量
                // 建筑扫描的高度
                u_height: this.height,
                u_up_color: {
                    value: new THREE.Color(color.resingColor),
                },
                u_city_color: {
                    value: new THREE.Color(this.meshColor),
                },

                u_head_color: {
                    value: new THREE.Color(this.headhColor),
                },

                u_size: {
                    value: size,
                },
            },
            vertexShader: `
        varying vec3 v_position;

        void main() {
        v_position = position;
          gl_Position =  projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec3 v_position;
        uniform vec3 u_city_color;
        uniform vec3 u_head_color;
        uniform float u_size;
        uniform vec3 u_up_color;
        uniform float u_height;

        void main() {
          vec3 base_color = u_city_color;
          base_color = mix(base_color, u_head_color, v_position.z / u_size);

          // 上升线条的高度
          if( u_height > v_position.z && u_height < v_position.z + 6.0 ) {
            float f_index = ( u_height -  v_position.z ) / 3.0;
            base_color = mix( u_up_color, base_color, abs(f_index - 1.0 ));
          };

          gl_FragColor = vec4(base_color, 1.0);
        }
      `,
        })
        const mesh = new THREE.Mesh(this.child.geometry, material)

        // 让mesh继承 child的 选择，缩放平移
        mesh.position.copy(this.child.position)
        mesh.rotation.copy(this.child.rotation)
        mesh.scale.copy(this.child.scale)
        this.scene.add(mesh)
    }

    createLine() {
        const edges = new THREE.EdgesGeometry(this.child.geometry) // 获取建筑外围

        const { max, min } = this.child.geometry.boundingBox

        // api创建线条
        // const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: color.soundLine } ) );

        // 着色器自定义线条渲染
        const matarial = new THREE.ShaderMaterial({
            uniforms: {
                line_color: {
                    value: new THREE.Color(color.soundLine),
                },
                // 不断变化的值
                u_time: this.time,
                // 场景扫描的位置
                u_max: {
                    value: max,
                },
                u_min: {
                    value: min,
                },
                // 场景扫描 颜色
                live_color: {
                    value: new THREE.Color(color.liveColor),
                },
            },
            vertexShader: `
        uniform float u_time;
        uniform vec3 u_max;
        uniform vec3 u_min;
        uniform vec3 live_color;
        uniform vec3 line_color;
        varying vec3 v_color;

        void main() {
          // mod(x, y): 取模， x - y*floor(x/y),函数形状跟fract相似,如果y=1.0,那么mod和fract函数的形状就相同了。
          float new_time = mod( u_time * 0.1, 1.0 );
          float rangeY = mix( u_min.y, u_max.y, new_time );   // 扫描的位置

          // 在这个区间显示场景扫描光带
          if( rangeY < position.y && rangeY > position.y - 200.0 ) {
            float f_index = 1.0 - sin( (position.y - rangeY) / 200.0 * 3.14 );
            float r = mix( live_color.r, line_color.r, f_index );
            float g = mix( live_color.g, line_color.g, f_index );
            float b = mix( live_color.b, line_color.b, f_index );

            v_color = vec3( r, g, b );
          } else {
            v_color = line_color;
          };

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec3 v_color;
        void main() {
          gl_FragColor = vec4(v_color, 1.0);
        }
      `,
        })
        const line = new THREE.LineSegments(edges, matarial)

        // 继承模型 大小 偏移 旋转
        line.scale.copy(this.child.scale)
        line.rotation.copy(this.child.rotation)
        line.position.copy(this.child.position)
        this.scene.add(line)
    }
}
