import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { useControls } from '../hooks/useControls'
import { useDrag } from '../hooks/useDrag'
import { useSelection } from '../hooks/useSelection'
import fragmentShader from './device.frag?raw'
import vertexShader from './device.vert?raw'

// import { useDrag } from '../hooks/useDrag'
// import { useHover } from '../hooks/useHover'

export const Device = () => {
    // const [bindHover, hovered] = useHover()

    const { size } = useThree()
    const uniforms = useRef({
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2(size.width, size.height) },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
    })

    const ref = useRef<THREE.Mesh>()
    const { onPointerOver, onPointerOut, onClick, material } = useControls(ref)

    useFrame((s, delta) => {
        window.requestAnimationFrame(() => {
            uniforms.current.u_time.value += delta
        })
        // console.log(uniforms.current.u_time.value)
    })
    return (
        <group>
            <mesh
                ref={ref}
                onClick={onClick}
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
            >
                <boxGeometry args={[1, 1, 1]} />
                {/* <shaderMaterial
                    uniforms={uniforms.current}
                    fragmentShader={fragmentShader}
                    // vertexShader={vertexShader}
                /> */}
                {material || <meshStandardMaterial color={'grey'} />}
            </mesh>
        </group>
    )
}
