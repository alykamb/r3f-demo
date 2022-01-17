import { CommandBusOptions, createCommandBus } from '@collidor/command'
import {
    undoableCommand,
    UndoableCommandController,
} from '@collidor/command/dist/plugins/undoableCommand'

export const controller = new UndoableCommandController()
const onExecute = undoableCommand(controller)

export const { editBus, EditBusHandler, bind } = createCommandBus(
    'EditBus',
    new CommandBusOptions({ onExecute }),
)
