import { createContext } from 'react'
import { Observable, Subject } from 'rxjs'

import { useSelection } from '../hooks/useSelection'

export interface ControlsContext {
    selection: ReturnType<typeof useSelection>
    onPointerMissed$: Observable<ThreePointerEvent>
    onKeyPress$: Subject<KeyboardEvent>
}

export const controlsContext = createContext<ControlsContext>({} as ControlsContext)
