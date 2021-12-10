import { createContext } from 'react'
import { Observable, Subject } from 'rxjs'
import { Object3D } from 'three'

export interface ControlsContext {
    selection: [selected: Object3D[], setSelected: React.Dispatch<React.SetStateAction<Object3D[]>>]
    onPointerMissed$: Observable<ThreePointerEvent>
    onKeyPress$: Subject<React.KeyboardEvent<HTMLDivElement>>
}

export const controlsContext = createContext<ControlsContext>({} as ControlsContext)
