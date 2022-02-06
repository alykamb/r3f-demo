import { Container } from 'inversify'
import { PerspectiveCamera } from 'three'

export const CameraProvider = (container: Container) => {
    container
        .bind(PerspectiveCamera)
        .toConstantValue(
            new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
        )
}
