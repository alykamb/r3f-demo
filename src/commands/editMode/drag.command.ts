import { UndoableCommand } from '@collidor/command/dist/plugins/undoableCommand'
import { Object3D, Vector3 } from 'three'

import { bind } from './editMode.bus'

export class DragCommand extends UndoableCommand<null, void> {
    constructor(
        public objs: Object3D[],
        public delta: Vector3,
        public originalPosition: WeakMap<Object3D, Vector3>,
    ) {
        super()
    }
}

export default bind(DragCommand, ({ delta, objs, originalPosition }) => {
    const originalPositions = new WeakMap<Object3D, Vector3>()

    objs.forEach((obj) => {
        if (!originalPosition.has(obj)) {
            originalPosition.set(obj, obj.position.clone())
        }
        const originalP = originalPosition.get(obj)?.clone() || new Vector3()

        const newP = originalP.clone().add(delta)
        obj.position.set(newP.x, newP.y, newP.z)
        originalPositions.set(obj, originalP.clone())
        originalPosition.set(obj, obj.position.clone())
    })
    return {
        undo: async () => {
            objs.forEach((obj) => {
                const originalP = originalPositions.get(obj)?.clone() || new Vector3()
                obj.position.set(originalP.x, originalP.y, originalP.z)
                originalPosition.set(obj, originalP.clone())
            })
        },
        value: null,
    }
})
