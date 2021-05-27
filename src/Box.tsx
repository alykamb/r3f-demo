import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useState } from 'react'

function Box(props: any) {
    // This reference will give us direct access to the mesh
    const mesh = useRef<any>()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame((/* state, delta */) => {
        if (mesh.current) {
            mesh.current.rotation.x += 0.01
        }
    })

    // const { camera } = useThree()
    // console.log(camera)
    // Return view, these are regular threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export default Box
