export class DeviceModel {
    public name = ''

    public id = ''

    constructor(arg?: DeviceModel) {
        Object.assign(this, arg)
    }

    public clone() {
        return new DeviceModel(this)
    }
}
