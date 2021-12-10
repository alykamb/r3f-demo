import {
    BoxGeometry,
    GridHelper,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

export function createGame(element: Element) {
    const scene: Scene = new Scene()
    const camera: PerspectiveCamera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    )

    const size = 10
    const divisions = 10

    const gridHelper = new GridHelper(size, divisions)
    scene.add(gridHelper)

    const renderer: WebGLRenderer = new WebGLRenderer()

    function render() {
        renderer.render(scene, camera)
    }
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', render)
    renderer.setSize(window.innerWidth, window.innerHeight)
    element.appendChild(renderer.domElement)

    camera.position.z = 5
    camera.position.y = 5
    camera.position.x = 5

    camera.lookAt(0, 0, 0)

    const geometry = new BoxGeometry()
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Mesh(geometry, material)

    scene.add(cube)

    const stats = Stats()
    document.body.appendChild(stats.dom)
    function animate() {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        stats.update()
        render()
    }

    window.addEventListener('resize', () => {
        console.log('resize')
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    animate()
}
