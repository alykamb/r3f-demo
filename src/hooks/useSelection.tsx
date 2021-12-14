import { useCallback, useState } from 'react'
import { Object3D } from 'three'

export const useSelection = () => {
    const [selected, setSelected] = useState<Object3D[]>([])

    const add = useCallback((obj: Object3D) => {
        setSelected((s) => {
            if (!s.includes(obj)) {
                return [...s, obj]
            }
            return s
        })
    }, [])

    const remove = useCallback((obj: Object3D) => {
        setSelected((s) => s.filter((i) => i !== obj))
    }, [])

    const toggleSelection = useCallback(
        (obj: Object3D) => (selected.includes(obj) ? remove(obj) : add(obj)),
        [selected],
    )

    const clearSelection = useCallback(() => {
        setSelected([])
    }, [])

    const getMidPoint = useCallback(() => {
        if (!selected.length) {
            return selected[0].position
        }

        return selected.reduce((acc, obj) => {
            const dir = acc.sub(obj.position)
            const len = dir.length()
            const normalizedDir = dir.normalize().multiplyScalar(len * 0.5)
            return obj.position.clone().add(normalizedDir)
        }, selected[0].position.clone())
    }, [selected])

    const isSelected = useCallback((obj: Object3D) => selected.includes(obj), [selected])

    console.log(selected)

    return { toggleSelection, clearSelection, remove, add, isSelected, getMidPoint, selected }
}
