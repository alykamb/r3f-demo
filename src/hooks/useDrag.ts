import { Camera, useFrame, useThree } from '@react-three/fiber'
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Subject } from 'rxjs'
import * as THREE from 'three'
import { Vector3 } from 'three'

import { camContext } from '../contexts/camera'

export const useDrag = () => {
    const [isDragging, setIsDragging] = useState(false)

    const { mouse, raycaster, camera } = useThree()

    const [, lockControls] = useContext(camContext)

    const plane = useRef(new THREE.Plane())
    const worldPosition = useRef(new THREE.Vector3())
    const offset = useRef(new THREE.Vector3())
    const intersects = useRef(new THREE.Vector3())
    const originalPosition = useRef(new Vector3())
    const newPostion$ = useRef(new Subject<Vector3>())

    const startDrag = useCallback(
        (position: Vector3) => {
            originalPosition.current.copy(position)
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

            setIsDragging(true)
        },
        [setIsDragging, camera, intersects, offset, raycaster, mouse],
    )

    const stopDrag = useCallback(() => {
        setIsDragging(false)
    }, [setIsDragging, lockControls])

    const cancelDrag = useCallback(() => {
        stopDrag()
        return originalPosition.current
    }, [])

    const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        startDrag(e.object.position)
        if (lockControls) {
            lockControls(true)
        }
    }

    const onPointerUp = useCallback(() => {
        cancelDrag()
        if (lockControls) {
            lockControls(false)
        }
    }, [setIsDragging, lockControls])

    useFrame(() => {
        raycaster.setFromCamera(mouse, camera)
        if (isDragging && raycaster.ray.intersectPlane(plane.current, intersects.current)) {
            const newP = intersects.current.add(offset.current)
            newPostion$.current.next(newP)
        }
    })

    const drag = () => new Observable()

    return {
        ref,
        bindDrag: {
            onPointerUp,
            onPointerDown,
        },
    }
}
