import { UndoableCommand } from '@collidor/command'
import { Object3D, Vector3 } from 'three'

import { bind } from './editMode.bus'

export class DragCommand extends UndoableCommand<void> {
    constructor(public obj: Object3D, public position: Vector3, public originalPosition: Vector3) {
        super()
    }
}

export default bind(DragCommand, (command) => {
    command.obj.position.copy(command.position)

    return {
        undo: async () => {
            command.obj.position.copy(command.originalPosition)
        },
        value: Promise.resolve(),
    }
})
