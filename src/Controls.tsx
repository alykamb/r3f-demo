import { extend, useThree } from '@react-three/fiber'
import React, { FunctionComponent, ReactChildren, useCallback, useState } from 'react'
import { Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { camContext } from './contexts/camera'
import { selectionContext } from './contexts/selection'

extend({ OrbitControls })

interface Props {
    children: ReactChildren | JSX.Element
}

export const Controls: FunctionComponent<Props> = ({ children }: Props) => {
    const { gl, camera } = useThree()
    const controlsLock = useState(false)
    const [selected, setSelected] = useState<Mesh[]>([])

    const add = useCallback((ref: Mesh) => {
        setSelected((s) => [...s, ref])
    }, [])

    const remove = useCallback((ref: Mesh) => {
        setSelected((s) => s.filter((i) => i !== ref))
    }, [])

    return (
        <>
            <orbitControls
                enableZoom
                args={[camera, gl.domElement]}
                enableDamping
                enabled={!controlsLock[0]}
            />
            <camContext.Provider value={controlsLock}>
                <selectionContext.Provider value={{ add, remove, selected }}>
                    {children}
                </selectionContext.Provider>
            </camContext.Provider>
        </>
    )
}
