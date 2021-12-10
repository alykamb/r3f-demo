import './App.scss'

import { Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { memo, useEffect, useRef } from 'react'
import { Subject } from 'rxjs'

import { Controller } from './controller/controller'
import { Devices } from './devices/devices'
import { createGame } from './game/game'
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

const onKeyPress$ = new Subject<React.KeyboardEvent<HTMLDivElement>>()
const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => onKeyPress$.next(e)

export function App() {
    return (
        <div className="app">
            <Controller />
            <Canvas
                camera={{ position: [2, 2, 2] }}
                onPointerMissed={onPointerMissed}
                onKeyPress={onKeyPress}
            >
                <Stats />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <ControlsProvider onPointerMissed$={onPointerMissed$} onKeyPress$={onKeyPress$}>
                    <Devices />
                </ControlsProvider>
                {/* <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                <Box position={[2.4, 0, 0]} /> */}

                <Sphere />
                <gridHelper args={[20, 40, 'red', '#ff0055']} />
            </Canvas>
        </div>
    )
}

export default App
