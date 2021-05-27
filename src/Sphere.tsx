import React from 'react'

const Sphere = () => {
    return (
        <mesh position={[0, 0.2, 0]}>
            <sphereGeometry attach="geometry" args={[2, 20, 20]} />
            <meshBasicMaterial attach="material" color="purple" wireframe />
        </mesh>
    )
}

export default Sphere
