import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { camContext } from '../contexts/camera'

export function useDrag(onDrag: any, onEnd: any) {
    const [active, setActive] = useState<any>(false)
    const [, toggle] = useContext(camContext)
    const activeRef = useRef()

    const down = useCallback(
        (e) => {
            setActive(true)
            toggle(false)
            e.stopPropagation()
            e.target.setPointerCapture(e.pointerId)
        },
        [toggle],
    )
    const up = useCallback(
        (e) => {
            setActive(false)
            toggle(true)
            e.target.releasePointerCapture(e.pointerId)
            if (onEnd) {
                onEnd()
            }
        },
        [onEnd, toggle],
    )
    const move = useCallback(
        (event) => {
            if (activeRef.current) {
                event.stopPropagation()
                console.log(event, onDrag)
            }
            // activeRef.current && (, onDrag(.unprojectedPoint))
        },
        [onDrag],
    )
    useEffect(() => {
        activeRef.current = active
    })

    return { onPointerDown: down, onPointerUp: up, onPointerMove: move }
}
