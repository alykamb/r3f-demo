import { extend, useThree } from '@react-three/fiber'
import React, {
    FunctionComponent,
    ReactChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { Subject } from 'rxjs'
import { Object3D } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { camContext } from '../contexts/camera'
import { controlsContext } from '../contexts/controls'

extend({ OrbitControls })

interface Props {
    children: ReactChildren | JSX.Element
    onPointerMissed$: Subject<ThreePointerEvent>
    onKeyPress$: Subject<React.KeyboardEvent<HTMLDivElement>>
}

window.addEventListener('keypress', console.log)

export const ControlsProvider: FunctionComponent<Props> = ({
    children,
    onPointerMissed$,
    onKeyPress$,
}: Props) => {
    const { gl, camera } = useThree()
    const controlsLock = useState(false)
    const selection = useState<Object3D[]>([])

    return (
        <>
            <orbitControls
                enableZoom
                args={[camera, gl.domElement]}
                enableDamping
                enabled={!controlsLock[0]}
            />
            <camContext.Provider value={controlsLock}>
                <controlsContext.Provider value={{ selection, onPointerMissed$, onKeyPress$ }}>
                    {children}
                </controlsContext.Provider>
            </camContext.Provider>
        </>
    )
}
