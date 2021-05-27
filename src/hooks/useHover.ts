import { useCallback, useState } from 'react'

export function useHover() {
    const [hovered, setHover] = useState(false)
    const hover = useCallback((e) => {
        e.stopPropagation()
        setHover(true)
    }, [])
    const unhover = useCallback(() => setHover(false), [])
    return [{ onPointerOver: hover, onPointerOut: unhover }, hovered]
}
