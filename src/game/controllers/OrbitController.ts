import { inject, injectable } from 'inversify'
import { PerspectiveCamera, Quaternion, Spherical, Vector2, Vector3 } from 'three'

import { Controller } from '../decorators/controller.decorator'
import { SceneController } from '../Scene.controller'
import { MouseController } from './Mouse.controller'

@Controller()
@injectable()
export class OrbitController {
    private sphericalDelta = new Spherical()

    private target = new Vector3()

    private cameraUpQuaternion!: Quaternion

    private previousMouse: Vector2 | null = null

    constructor(
        @inject(PerspectiveCamera) private camera: PerspectiveCamera,
        @inject(MouseController) private mouseController: MouseController,
        @inject(SceneController) private sceneController: SceneController,
    ) {}

    init() {
        this.cameraUpQuaternion = new Quaternion().setFromUnitVectors(
            this.camera.up,
            new Vector3(0, 1, 0),
        )
    }

    //rotation
    private rotateLeft(angle: number) {
        this.sphericalDelta.theta -= angle
    }

    private rotateUp(angle: number) {
        this.sphericalDelta.phi -= angle
    }

    private rotate(delta: Vector2) {
        const spherical = new Spherical()
        spherical.setFromVector3(this.target)
        spherical.theta = ((delta.y + 1) * Math.PI) / 4

        console.log((delta.y + 1) * Math.PI)
        // spherical.phi = Math.acos(2 * 1 - 1)
        spherical.radius = this.camera.position.distanceTo(this.target)

        this.camera.position.setFromSpherical(spherical)
        // new Quaternion().setFromUnitVectors(this.target, this.camera.position)
        // const horizontalVector = new Vector3(0, 0, delta.x * 10)
        //     .cross(new Vector3(0, 1, 0))
        //     .applyQuaternion(this.camera.quaternion)
        // const offset = this.camera.position
        //     //     .add(horizontalVector)
        //     //     .clone()
        //     .distanceTo(this.target)
        // const camX = Math.sin(delta.x * Math.PI) * offset
        // console.log(delta.x * Math.PI, camX, offset)
        // this.camera.position.setX(camX)
        //     .applyQuaternion(this.cameraUpQuaternion)
        // this.rotateLeft(2 * Math.PI * delta.x)
        // this.rotateUp(2 * Math.PI * delta.y)
        // offset.setFromSpherical(this.sphericalDelta)
        // this.camera.position.copy(this.target).add(offset)
    }

    //pan
    private pan(delta: Vector2) {
        const horizontalVector = new Vector3(0, 0, delta.x * 10)
            .cross(new Vector3(0, 1, 0))
            .applyQuaternion(this.camera.quaternion)

        const verticalVector = new Vector3(0, delta.y * 10, 0).applyQuaternion(
            this.cameraUpQuaternion,
        )

        this.camera.position
            //horizontal
            .add(horizontalVector)
            //vertical
            .add(verticalVector)

        this.target.add(horizontalVector)
    }

    private dolly(delta: Vector2) {
        const dollyVector = new Vector3(0, delta.y * 10, 0)
            .cross(new Vector3(1, 0, 0))
            .applyQuaternion(this.camera.quaternion)

        this.camera.position.add(dollyVector)

        this.target.add(dollyVector)
    }

    onUpdate() {
        if (!this.mouseController.MIDDLE_BUTTON) {
            if (this.previousMouse) {
                this.previousMouse = null
            }
            return
        }

        if (!this.previousMouse) {
            this.previousMouse = this.mouseController.position.clone()
            return
        }

        const delta = this.previousMouse.clone().sub(this.mouseController.position)

        // this.pan(delta)
        // this.dolly(delta)
        this.rotate(delta)

        this.previousMouse.copy(this.mouseController.position)
    }
}

export function getRadius(index: number, length: number, min: number, max: number) {
    const step = (max - min) / length
    return min + step * index
}
