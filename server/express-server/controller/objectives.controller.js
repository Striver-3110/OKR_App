export class ObjectivesController {
    constructor(objectiveServices) {
        this.objectiveServices = objectiveServices
    }

    fetchAll() {
        return this.objectiveServices.fetchAll()
    }
}