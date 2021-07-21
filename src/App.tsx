import './App.scss'

import { Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

import { Controller } from './controller/controller'
import { Controls } from './Controls'
import { Devices } from './devices/devices'
// import Fog from './Fog'
import Sphere from './Sphere'
// import ReactDOM from 'react-dom'
// import logo from './logo.svg'

function App() {
    return (
        <div className="app">
            <Controller />
            <Canvas camera={{ position: [2, 2, 2] }}>
                <Stats />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Controls>
                    <Devices />
                </Controls>
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
