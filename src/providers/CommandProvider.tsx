import { CommandBusBase } from '@collidor/command'
import { UndoableCommandController } from '@collidor/command/dist/plugins/undoableCommand'
import { useEffect } from 'react'
import React from 'react'
import { Subject } from 'rxjs'

import { CommandContext } from '../contexts/command'

interface CommandProviderProps {
    children: React.ReactNode
    onKeyPress$: Subject<KeyboardEvent>
    bus: CommandBusBase
    controller: UndoableCommandController
}

export function CommandProvider({ children, onKeyPress$, bus, controller }: CommandProviderProps) {
    useEffect(() => {
        const subscription = onKeyPress$.subscribe((e) => {
            if (e.ctrlKey && e.key === 'z') {
                controller.undoLast()
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    return <CommandContext.Provider value={bus}>{children}</CommandContext.Provider>
}
