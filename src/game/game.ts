import {
    BoxGeometry,
    GridHelper,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from 'three'

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

    const animate = function () {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        renderer.render(scene, camera)
    }

    window.addEventListener('resize', () => {
        console.log('resize')
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    animate()
}
