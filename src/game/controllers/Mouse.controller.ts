import { inject, injectable } from 'inversify'
import { Vector2 } from 'three'

import { TYPES } from '../constants/injectables.constants'

@injectable()
export class MouseController {
    public position = new Vector2(0, 0)

    public LEFT_BUTTON = false

    public MIDDLE_BUTTON = false

    public RIGHT_BUTTON = false

    public onPointerMove = (event: PointerEvent) => {
        const box = this.element.getBoundingClientRect()

        this.position.set((event.clientX / box.width) * 2 - 1, (event.clientY / box.height) * 2 - 1)
    }

    public onPointerDown = (event: PointerEvent) => {
        if (event.button === 0) {
            this.LEFT_BUTTON = true
        } else if (event.button === 1) {
            this.MIDDLE_BUTTON = true
        } else if (event.button === 2) {
            this.RIGHT_BUTTON = true
        }
    }

    public onPointerUp = (event: PointerEvent) => {
        if (event.button === 0) {
            this.LEFT_BUTTON = false
        } else if (event.button === 1) {
            this.MIDDLE_BUTTON = false
        } else if (event.button === 2) {
            this.RIGHT_BUTTON = false
        }
    }

    constructor(@inject(TYPES.Element) private element: Element) {}

    init() {
        const canvas: HTMLCanvasElement = this.element.children[0] as HTMLCanvasElement
        canvas.addEventListener('pointermove', this.onPointerMove)
        canvas.addEventListener('pointerdown', this.onPointerDown)
        canvas.addEventListener('pointerup', this.onPointerUp)
    }
}
