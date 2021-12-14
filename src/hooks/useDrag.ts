import { useFrame, useThree } from '@react-three/fiber'
import { useCallback, useRef } from 'react'
import { Subject } from 'rxjs'
import * as THREE from 'three'
import { Vector3 } from 'three'

export const useDrag = () => {
    const { mouse, raycaster, camera } = useThree()

    const plane = useRef(new THREE.Plane())
    const isDragging = useRef(false)
    const worldPosition = useRef(new THREE.Vector3())
    const offset = useRef(new THREE.Vector3())
    const intersects = useRef(new THREE.Vector3())
    const newPosition$ = useRef(new Subject<Vector3>())
    // const stop$ = useRef(new Subject<void>())
    // const start$ = useRef(new Subject<void>())

    const startDrag = useCallback(
        (position: Vector3) => {
            worldPosition.current.copy(position)

            plane.current
                .setFromNormalAndCoplanarPoint(
                    camera.getWorldDirection(plane.current.normal),
                    worldPosition.current,
                )
                .normalize()

            raycaster.setFromCamera(mouse, camera)
            raycaster.ray.intersectPlane(plane.current, intersects.current)
            offset.current.copy(position).sub(intersects.current)

            isDragging.current = true
        },
        [camera, intersects, offset, raycaster, mouse],
    )

    const stopDrag = useCallback(() => {
        isDragging.current = false
    }, [])

    const cancelDrag = useCallback(() => {
        stopDrag()
        return worldPosition.current
    }, [])

    useFrame(() => {
        raycaster.setFromCamera(mouse, camera)
        if (isDragging.current && raycaster.ray.intersectPlane(plane.current, intersects.current)) {
            newPosition$.current.next(intersects.current.add(offset.current))
        }
    })

    return {
        stopDrag,
        startDrag,
        cancelDrag,
        newPosition$,
        isDragging,
    }
}
