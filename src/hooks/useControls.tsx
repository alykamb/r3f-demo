import { useCallback, useContext, useEffect, useState } from 'react'
import React from 'react'
import { filter, Subscription } from 'rxjs'

import { controlsContext } from '../contexts/controls'
import { useDrag } from './useDrag'
import { useSelection } from './useSelection'

export class ControlOptions {
    drag = true

    select = true
}

export function useControls(ref: MeshRef, options = new ControlOptions()) {
    const [hover, setHover] = useState(false)
    const controls = useContext(controlsContext)

    const onPointerOver = useCallback((e: ThreePointerEvent) => {
        e.stopPropagation()
        setHover(true)
    }, [])

    const onPointerOut = useCallback(() => {
        setHover(false)
    }, [])

    const onClick = useCallback(() => {
        controls.selection.add(ref.current!)
    }, [])

    const material = controls.selection.isSelected(ref.current!) ? (
        <meshStandardMaterial color="red" />
    ) : (
        hover && <meshStandardMaterial color="yellow" />
    )

    console.log(controls.selection.isSelected(ref.current!))

    return { onPointerOver, onPointerOut, onClick, material }
}
