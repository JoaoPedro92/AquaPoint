export class AquaPoint{
    constructor(data = {}){
        this.id = data.id ?? null
        this.name = data.name ?? ''
        this.image = data.image ?? ''
        this.type = data.type ?? ''
        this.longitude = data.longitude ?? null
        this.latitude = data.latitude ?? null
    }
}