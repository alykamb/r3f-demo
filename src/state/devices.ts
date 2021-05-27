import { createState } from '@hookstate/core'

import { DeviceModel } from '../model/device.model'

export const devicesState = createState<DeviceModel[]>([])
