export const CONTROLLER_META = Symbol('controller')

export function Controller(): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(CONTROLLER_META, true, target)
    }
}
