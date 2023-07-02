import { Type } from "../../models/Type.model"

class TypeService {
    async create(type: { name: string }) {
        const createdType = await Type.create(type)
        return createdType

    }

    async getAll() {
        const types = await Type.findAll()
        return types
    }
}

export default new TypeService()