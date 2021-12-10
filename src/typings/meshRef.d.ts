import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events'
import { MutableRefObject } from 'react'
import { BufferGeometry, Material, Mesh } from 'three'

declare global {
    type MeshRef = MutableRefObject<Mesh<BufferGeometry, Material | Material[]> | undefined>
    type ThreePointerEvent = ThreeEvent<PointerEvent>
}
