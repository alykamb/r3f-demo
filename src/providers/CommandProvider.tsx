import { UndoableResult } from '@collidor/command'
import { useCallback, useEffect, useState } from 'react'
import { Subject, tap } from 'rxjs'

import { editBus } from '../commands/editMode/editMode.bus'

export function CommandProvider(onKeyPress$: Subject<KeyboardEvent>) {
    const [queue, setQueue] = useState<UndoableResult[]>([])

    const addToQueue = useCallback((result: UndoableResult) => {
        setQueue((q) => {
            if (q.length > 10) {
                q.pop()
            }
            return [result, ...q]
        })
    }, [])

    useEffect(() => {
        ;(editBus as any).afterExecute(
            tap((result: UndoableResult) => {
                if ((result as UndoableResult).undo) {
                    addToQueue(result)
                }
            }),
        )

        const subscription = onKeyPress$.subscribe((e) => {
            if (e.ctrlKey && e.key === 'z') {
                setQueue((q) => {
                    const newQueue = q.shift()
                    void newQueue?.undo?.()
                    return [...q]
                })
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        console.log(queue)
    }, [queue])

    return null
}
