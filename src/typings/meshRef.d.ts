import { MutableRefObject } from 'react'
import { BufferGeometry, Material, Mesh } from 'three'

declare global {
    type MeshRef = MutableRefObject<Mesh<BufferGeometry, Material | Material[]> | undefined>
}
