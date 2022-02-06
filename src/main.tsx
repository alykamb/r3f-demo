import './index.css'
import 'reflect-metadata'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import.meta.glob('./commands/*.command.ts')

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
)
