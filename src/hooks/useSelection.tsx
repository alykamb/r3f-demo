import { useCallback, useContext } from 'react'

import { controlsContext } from '../contexts/controls'

export const useSelection = (ref: MeshRef) => {
    const {
        selection: [selected, setSelected],
    } = useContext(controlsContext)

    const add = useCallback(() => {
        if (ref.current) {
            setSelected((s) => [...s, ref.current!])
        }
    }, [])

    const remove = useCallback(() => {
        setSelected((s) => s.filter((i) => i !== ref.current))
    }, [])

    const toggleSelection = useCallback(
        () => (selected.includes(ref.current!) ? remove() : add()),
        [selected],
    )

    const clearSelection = useCallback(() => {
        setSelected([])
    }, [])

    const isSelected = selected.includes(ref.current!)

    return { toggleSelection, clearSelection, remove, add, isSelected }
}
