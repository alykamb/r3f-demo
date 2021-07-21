import { useFrame, useThree } from '@react-three/fiber'
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events'
import React, { useCallback, useEffect, useState } from 'react'

export const useSelection = (ref: MeshRef) => {
    const { mouse, camera, raycaster } = useThree()
    const [isHovered, setHover] = useState(false)
    raycaster.setFromCamera(mouse, camera)

    const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        console.log('onClick', e.object)
    }, [])

    const onPointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
        console.log('onPointerOver', e.object)
        setHover(true)
    }, [])
    const onPointerMissed = useCallback((e: ThreeEvent<PointerEvent>) => {
        console.log('onPointerMissed', e.object)
    }, [])
    const onPointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
        console.log('onPointerOut', e.object)
        setHover(false)
    }, [])

    const material = isHovered && <meshStandardMaterial color="yellow" />
    // console.log(ref)
    return { onPointerOver, onClick, onPointerMissed, material, onPointerOut }
}
