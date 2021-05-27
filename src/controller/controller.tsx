import { useState } from '@hookstate/core'
import React from 'react'

import { DeviceModel } from '../model/device.model'
import { devicesState } from '../state/devices'

export const Controller = () => {
    const devices = useState(devicesState)
    const newDevice = useState<DeviceModel>(new DeviceModel())

    const addDevice = () => {
        devices[devices.length].set(newDevice.value.clone())
    }
    return (
        <div className="controller">
            <input
                type="text"
                onInput={(e) => newDevice.nested('name').set(e.currentTarget.value)}
            />
            <input type="text" onInput={(e) => newDevice.nested('id').set(e.currentTarget.value)} />
            <button type="button" id="add-device" onClick={addDevice}>
                Add
            </button>
            <div>
                <pre>{devices.map((d) => JSON.stringify(d.value))}</pre>
            </div>
        </div>
    )
}
