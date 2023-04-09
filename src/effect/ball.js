import * as THREE from 'three'
import { color } from '../config'

export class Ball {
    constructor(scene, time) {
        this.scene = scene
        this.time = time
        this.createSphere({
            radius: 50,
            color: color.ball,
            opacity: 0.6,
            height: 60,
            open: false,
            position: {
                x: 300,
                y: 0,
                z: -200,
            },
            speed: 5,
        })
    }

    createSphere(options) {
        const geometry = new THREE.SphereGeometry(50, 32, 32, Math.PI / 2, Math.PI * 2, 0, Math.PI / 2)

        const material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            depthTest: false,
            transparent: true,
            uniforms: {
                u_color: {
                    value: new THREE.Color(options.color),
                },
                u_height: {
                    value: options.height,
                },
                u_opacity: {
                    value: options.opacity,
                },
                u_time: this.time,
                u_speed: {
                    value: options.speed,
                },
            },
            vertexShader: `
        uniform float u_height;
        uniform float u_time;
        varying float u_opactry;
        uniform float u_speed;
        void main() {
          u_opactry = mix( 1.0, 0.0, position.y / u_height);
          vec3 v_position = position * mod( u_time / u_speed, 1.0 );
          gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 u_color;
        uniform float u_opacity;
        varying float u_opactry;

        void main() {
          gl_FragColor = vec4( u_color, u_opacity * u_opactry );
        }
      `,
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.copy(options.position)
        this.scene.add(mesh)
    }
}
