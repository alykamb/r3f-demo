import { Camera, useFrame, useThree } from '@react-three/fiber'
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events'
import { MutableRefObject, useCallback, useContext, useRef, useState } from 'react'
import * as THREE from 'three'
import { BufferGeometry, Material, Mesh } from 'three'

import { camContext } from '../contexts/camera'

interface UseDragOptions {
    ref?: MutableRefObject<Mesh<BufferGeometry, Material | Material[]> | undefined>
    camera?: Camera
    raycaster?: THREE.Raycaster
    mouse?: THREE.Vector2
}

export const useDrag = (options?: UseDragOptions) => {
    const [isDragging, setIsDragging] = useState(false)
    const three = useThree()
    const defaultRef = useRef<THREE.Mesh>()

    const mouse = options?.mouse || three.mouse
    const raycaster = options?.raycaster || three.raycaster
    const camera = options?.camera || three.camera
    const ref = options?.ref || defaultRef

    const [, enableControls] = useContext(camContext)

    const plane = useRef(new THREE.Plane())
    const worldPosition = useRef(new THREE.Vector3())
    const offset = useRef(new THREE.Vector3())
    const intersects = useRef(new THREE.Vector3())

    const onPointerDown = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            worldPosition.current.copy(e.object.position)

            plane.current
                .setFromNormalAndCoplanarPoint(
                    camera.getWorldDirection(plane.current.normal),
                    worldPosition.current,
                )
                .normalize()

            raycaster.setFromCamera(mouse, camera)
            raycaster.ray.intersectPlane(plane.current, intersects.current)
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
        if (isDragging && raycaster.ray.intersectPlane(plane.current, intersects.current)) {
            const newP = intersects.current.add(offset.current)
            ref.current?.position.copy(newP)
        }
    })

    return {
        ref,
        bindDrag: {
            onPointerUp,
            onPointerDown,
        },
    }
}
