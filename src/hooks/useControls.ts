import { useContext } from 'react'

import { controlsContext } from '../contexts/controls'
import { useDrag } from './useDrag'
import { useSelection } from './useSelection'

export class ControlOptions {
    drag = true

    select = true
}

export function useControls(ref: MeshRef, options = new ControlOptions()) {
    const controls = useContext(controlsContext)
    const drag = useDrag(ref)
    const selection = useSelection(ref)

    const
}
