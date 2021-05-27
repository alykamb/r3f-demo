import { extend, useThree } from '@react-three/fiber'
import React, { FunctionComponent, ReactChildren, useState } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { camContext } from './contexts/camera'

extend({ OrbitControls })

interface Props {
    children: ReactChildren | JSX.Element
}

export const Controls: FunctionComponent<Props> = ({ children }: Props) => {
    const { gl, camera } = useThree()
    const api = useState(true)

    return (
        <>
            <orbitControls
                enableZoom
                args={[camera, gl.domElement]}
                enableDamping
                enabled={api[0]}
            />
            <camContext.Provider value={api}>{children}</camContext.Provider>
        </>
    )
}
