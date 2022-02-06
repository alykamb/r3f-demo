import { Container } from 'inversify'
import { Scene } from 'three'

export const SceneProvider = (container: Container) => {
    container.bind(Scene).toConstantValue(new Scene())
}
