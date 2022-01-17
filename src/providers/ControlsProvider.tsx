import { CommandBusBase } from '@collidor/command'
import { extend, useThree } from '@react-three/fiber'
import React, { FunctionComponent, ReactChildren, useEffect, useState } from 'react'
import { combineLatestWith, filter, map, merge, Subject, Subscription, tap } from 'rxjs'
import { Object3D, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { DragCommand } from '../commands/editMode/drag.command'
import { camContext } from '../contexts/camera'
import { controlsContext } from '../contexts/controls'
import { useDrag } from '../hooks/useDrag'
import { useSelection } from '../hooks/useSelection'

extend({ OrbitControls })

interface Props {
    children: ReactChildren | JSX.Element
    onPointerMissed$: Subject<ThreePointerEvent>
    onKeyPress$: Subject<KeyboardEvent>
    mouseClick$: Subject<PointerEvent>
    bus: CommandBusBase
}

export const ControlsProvider: FunctionComponent<Props> = ({
    children,
    onPointerMissed$,
    onKeyPress$,
    bus,
    mouseClick$,
}: Props) => {
    const { gl, camera } = useThree()
    const controlsLock = useState(false)
    const selection = useSelection()
    const drag = useDrag()

    useEffect(() => {
        const subscription = new Subscription()
        let delta: Vector3
        const originalPositions = new WeakMap<Object3D, Vector3>()
        subscription.add(
            merge(onKeyPress$.pipe(filter((e) => e.key === 'Escape')), onPointerMissed$).subscribe(
                () => {
                    selection.clearSelection()
                    if (!delta || !drag.isDragging) {
                        return
                    }
                    selection.selected.forEach((obj) => {
                        const newP = originalPositions.get(obj)?.clone() || new Vector3()
                        obj.position.set(newP.x, newP.y, newP.z)
                    })
                    drag.stopDrag()
                    // selection.selected[0].position.set(p.x, p.y, p.z)
                },
            ),
        )

        subscription.add(
            onKeyPress$
                .pipe(
                    filter((e) => e.key === 'g' && !!selection.selected.length),
                    map(() => selection.getMidPoint()),
                    tap((midPoint) => {
                        // originalPositions.clear()
                        drag.startDrag(midPoint)
                    }),
                    combineLatestWith(drag.newPosition$.current),
                )
                .subscribe(([midPoint, p]) => {
                    delta = p.clone().sub(midPoint)
                    // console.log(midPoint, p, delta)

                    selection.selected.forEach((obj) => {
                        if (!originalPositions.has(obj)) {
                            originalPositions.set(obj, obj.position.clone())
                        }
                        const newP = originalPositions.get(obj)?.clone().add(delta) || new Vector3()

                        obj.position.set(newP.x, newP.y, newP.z)
                    })
                }),
        )

        subscription.add(
            mouseClick$.subscribe(() => {
                if (delta && drag.isDragging) {
                    bus.execute(new DragCommand(selection.selected, delta, originalPositions))
                    drag.stopDrag()
                }
            }),
        )

        return () => subscription.unsubscribe()
    })

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
