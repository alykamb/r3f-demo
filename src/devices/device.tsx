import { useFrame, useThree } from '@react-three/fiber'
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events'
import React, { useCallback, useContext, useRef, useState } from 'react'
import * as THREE from 'three'

import { camContext } from '../contexts/camera'
import { useHover } from '../hooks/useHover'

const plane = new THREE.Plane()
const worldPosition = new THREE.Vector3()

export const Device = () => {
    const [isDragging, setIsDragging] = useState(false)
    const { raycaster, camera, mouse } = useThree()
    const [bindHover, hovered] = useHover()
    const ref = useRef<THREE.Mesh>()
    const [, enableControls] = useContext(camContext)
    const offset = useRef(new THREE.Vector3())

    const intersects = useRef(new THREE.Vector3())

    const onPointerDown = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            worldPosition.copy(e.object.position)

            plane
                .setFromNormalAndCoplanarPoint(
                    camera.getWorldDirection(plane.normal),
                    worldPosition,
                )
                .normalize()

            raycaster.setFromCamera(mouse, camera)
            raycaster.ray.intersectPlane(plane, intersects.current)
            offset.current.copy(e.object.position).sub(intersects.current)

            setIsDragging(true)
            enableControls(false)
        },
        [setIsDragging, camera, enableControls, intersects, offset, raycaster, mouse],
    )

    const onPointerUp = useCallback(() => {
        setIsDragging(false)
        enableControls(true)
    }, [setIsDragging, enableControls])

    useFrame(() => {
        raycaster.setFromCamera(mouse, camera)
        if (isDragging && raycaster.ray.intersectPlane(plane, intersects.current)) {
            const newP = intersects.current.add(offset.current)
            ref.current?.position.copy(newP)
        }
    })

    return (
        <group>
            <mesh {...bindHover} onPointerDown={onPointerDown} onPointerUp={onPointerUp} ref={ref}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? 'cyan' : 'white'} />
            </mesh>
        </group>
    )
}
