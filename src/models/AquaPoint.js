export class AquaPoint{
    constructor(data = {}){
        this.id = data.id ?? null
        this.name = data.name ?? ''
        this.image = data.image ?? ''
        this.type = data.type ?? 0
        this.longitude = data.longitude ?? null
        this.latitude = data.latitude ?? null
        this.state_id = data.state_id ?? 1 // 0: avariado, 1: em funcionamento, 2: por aprovar (admin)
        this.ratingAVG = data.ratingAVG ?? 0.0
        this.ratingsAmount = data.ratingsAmount ?? 0.0
        this.localId = data.localId ?? null
        this.trustLevel = data.trustLevel ?? 1 //0: apagar, 1: Existe mas com pouca certeza, 2: Existe com alguma certeza, 3: Existe 100% certeza
    }
}