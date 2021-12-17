import { CommandBusBase, UndoableResult } from '@collidor/command'
import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import { Subject, tap } from 'rxjs'

import { CommandContext } from '../contexts/command'

interface CommandProviderProps {
    children: React.ReactNode
    onKeyPress$: Subject<KeyboardEvent>
    bus: CommandBusBase
}

export function CommandProvider({ children, onKeyPress$, bus }: CommandProviderProps) {
    const [queue, setQueue] = useState<Array<[any, () => Promise<any>]>>([])

    const addToQueue = useCallback((result: [any, () => Promise<any>]) => {
        setQueue((q: Array<[any, () => Promise<any>]>) => {
            if (q.length > 10) {
                q.pop()
            }
            return [result, ...q]
        })
    }, [])

    useEffect(() => {
        ;(bus as any).afterExecute(
            tap((result: [any, () => Promise<any>]) => {
                if (result as [any, () => Promise<any>]) {
                    addToQueue(result)
                }
            }),
        )

        const subscription = onKeyPress$.subscribe((e) => {
            if (e.ctrlKey && e.key === 'z') {
                setQueue((q) => {
                    const newQueue = q.shift()
                    void newQueue?.[1]?.()
                    return [...q]
                })
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        console.log(queue)
    }, [queue])

    return <CommandContext.Provider value={addToQueue}>{children}</CommandContext.Provider>
}
