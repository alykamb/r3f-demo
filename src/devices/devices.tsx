import { useState } from '@hookstate/core'
import React from 'react'

import { devicesState } from '../state/devices'
import { Device } from './device'

export const Devices = () => {
    const devices = useState(devicesState)
    return (
        <>
            {devices.map((d) => (
                <Device key={d.id.value} />
            ))}
        </>
    )
}
