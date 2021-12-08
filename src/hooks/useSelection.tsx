import { useFrame, useThree } from '@react-three/fiber'
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events'
import React, { useCallback, useContext, useEffect, useState } from 'react'

import { selectionContext } from '../contexts/selection'

export const useSelection = (ref: MeshRef) => {
    const { mouse, camera, raycaster } = useThree()
    const [isHovered, setHover] = useState(false)
    raycaster.setFromCamera(mouse, camera)
    const selection = useContext(selectionContext)

    const onClick = useCallback(
        (e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation()
            // e.preventDefault()
            if (selection.selected.includes(ref.current!)) {
                selection.remove(ref.current!)
            } else {
                selection.add(ref.current!)
            }
            // console.log('onClick', e.object)
        },
        [selection],
    )

    const onPointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        // console.log('onPointerOver', e.object)
        setHover(true)
    }, [])
    const onPointerMissed = useCallback((e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        // selection.remove(ref)
        // console.log('onPointerMissed', e.object)
    }, [])
    const onPointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        // console.log('onPointerOut', e.object)
        setHover(false)
    }, [])

    const material = selection.selected.includes(ref.current!) ? (
        <meshStandardMaterial color="red" />
    ) : isHovered ? (
        <meshStandardMaterial color="yellow" />
    ) : null
    console.log(selection.selected)
    return { onPointerOver, onClick, onPointerMissed, material, onPointerOut }
}
