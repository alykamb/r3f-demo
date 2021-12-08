import { createContext } from 'react'
import { Mesh } from 'three'

export interface SelectionContext {
    add(ref: Mesh): void
    remove(ref: Mesh): void
    selected: Mesh[]
}

export const selectionContext = createContext<SelectionContext>({} as SelectionContext)
