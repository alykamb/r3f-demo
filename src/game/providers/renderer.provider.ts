import { Container } from 'inversify'
import { WebGLRenderer } from 'three'

export const RendererProvider = (container: Container) => {
    container.bind(WebGLRenderer).toConstantValue(new WebGLRenderer({ antialias: true }))
}
