import { Container } from 'inversify'

import { TYPES } from './constants/injectables.constants'
import { MouseController } from './controllers/Mouse.controller'
import { OrbitController } from './controllers/OrbitController'
import { CONTROLLER_META } from './decorators/controller.decorator'
import { CameraProvider } from './providers/camera.provider'
import { RendererProvider } from './providers/renderer.provider'
import { SceneProvider } from './providers/scene.provider'
import { SceneController } from './Scene.controller'

function bindController(sceneController: SceneController, container: Container, Controller: any) {
    container.bind(Controller).toSelf().inSingletonScope()
    const controller: any = container.get(Controller)
    if (controller.init) {
        controller.init()
    }

    if (
        controller.onUpdate &&
        Reflect.getMetadata(CONTROLLER_META, Object.getPrototypeOf(controller).constructor)
    ) {
        sceneController.bindOnUpdate(controller.onUpdate.bind(controller))
    }
}

export function initScene(element: Element) {
    const container = new Container()

    container.bind(SceneController).toSelf().inSingletonScope()

    CameraProvider(container)
    RendererProvider(container)
    SceneProvider(container)

    container.bind(Container).toConstantValue(container)

    container.bind<Element>(TYPES.Element).toConstantValue(element)

    const sceneController = container.get(SceneController)

    sceneController.init()

    bindController(sceneController, container, MouseController)
    bindController(sceneController, container, OrbitController)

    return container
}
