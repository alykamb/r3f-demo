import { inject, injectable } from 'inversify'
import { GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'

import { TYPES } from './constants/injectables.constants'

@injectable()
export class SceneController {
    public onResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.render()
    }

    public stats = Stats()

    public onUpdateCallbacks = new Set<() => void>()

    constructor(
        @inject(Scene) private readonly scene: Scene,
        @inject(WebGLRenderer) private readonly renderer: WebGLRenderer,
        @inject(PerspectiveCamera) private readonly camera: PerspectiveCamera,
        @inject(TYPES.Element) private readonly element: Element,
    ) {}

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.element.appendChild(this.renderer.domElement)
        window.addEventListener('resize', this.onResize)
        const size = 100
        const divisions = 100

        const gridHelper = new GridHelper(size, divisions, 'red', '#ff0055')
        this.scene.add(gridHelper)

        this.camera.position.z = 5
        this.camera.position.y = 5
        this.camera.position.x = 5

        this.camera.lookAt(0, 0, 0)

        document.body.appendChild(this.stats.dom)

        this.animate()
    }

    bindOnUpdate(callback: () => void) {
        this.onUpdateCallbacks.add(callback)
    }

    onModuleDestroy() {
        window.removeEventListener('resize', this.onResize)
    }

    public render() {
        this.renderer.render(this.scene, this.camera)
    }

    public animate() {
        requestAnimationFrame(() => this.animate())

        this.onUpdateCallbacks.forEach((callback) => callback())
        this.stats.update()
        this.render()
    }
}
