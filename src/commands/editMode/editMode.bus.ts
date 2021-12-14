import { createCommandBus } from '@collidor/command'

export const { editBus, EditBusHandler, bind } = createCommandBus('EditBus')
