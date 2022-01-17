import './App.scss'

import { Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { memo, MouseEvent, useEffect, useRef } from 'react'
import { Subject } from 'rxjs'

import { controller, editBus } from './commands/editMode/editMode.bus'
import { Controller } from './controller/controller'
import { Devices } from './devices/devices'
import { createGame } from './game/game'
import { CommandProvider } from './providers/CommandProvider'
import { ControlsProvider } from './providers/ControlsProvider'
// import Fog from './Fog'
import Sphere from './Sphere'
// import ReactDOM from 'react-dom'
// import logo from './logo.svg'

export const rawApp = memo(() => {
    const app = useRef<HTMLDivElement>(null)

    useEffect(() => {
        createGame(app.current!)
    }, [])
    return <div className="app" ref={app}></div>
})

const onPointerMissed$ = new Subject<ThreePointerEvent>()
const onPointerMissed = (e: ThreePointerEvent) => onPointerMissed$.next(e)

const onKeyPress$ = new Subject<KeyboardEvent>()

const onClick$ = new Subject<PointerEvent>()

export function App() {
    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvas.current) {
            return
        }

        canvas.current.tabIndex = 0
        canvas.current.focus()
        const onKeyDown = (e: KeyboardEvent) => {
            if (canvas.current == document.activeElement || e.key === 'Escape') {
                onKeyPress$.next(e)
            }
        }

        const onClick = (e: PointerEvent) => {
            console.log(e)
            if (canvas.current == document.activeElement) {
                onClick$.next(e)
            }
        }

        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('click', onClick as any)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('click', onClick as any)
        }
    }, [])
    return (
        <div className="app">
            <Controller />
            <Canvas ref={canvas} camera={{ position: [2, 2, 2] }} onPointerMissed={onPointerMissed}>
                <Stats />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <CommandProvider onKeyPress$={onKeyPress$} controller={controller} bus={editBus}>
                    <ControlsProvider
                        onPointerMissed$={onPointerMissed$}
                        onKeyPress$={onKeyPress$}
                        mouseClick$={onClick$}
                        bus={editBus}
                    >
                        <Devices />
                    </ControlsProvider>
                </CommandProvider>
                {/* <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                <Box position={[2.4, 0, 0]} /> */}

                {/* <Sphere /> */}
                <gridHelper args={[20, 40, 'red', '#ff0055']} />
            </Canvas>
        </div>
    )
}

export default App
