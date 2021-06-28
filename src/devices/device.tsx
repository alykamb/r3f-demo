import React, { useRef } from 'react'
import * as THREE from 'three'

import { useDrag } from '../hooks/useDrag'
import { useHover } from '../hooks/useHover'

export const Device = () => {
    const [bindHover, hovered] = useHover()
    const ref = useRef<THREE.Mesh>()

    const { bindDrag } = useDrag({ ref })

    return (
        <group>
            <mesh {...bindHover} {...bindDrag} ref={ref}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? 'cyan' : 'white'} />
            </mesh>
        </group>
    )
}
