import { Brand } from "../../models/Brand.model"

class BrandService {
    async create(brand: { name: string }) {
        const createdBrand = await Brand.create(brand)
        return createdBrand
    }

    async getAll() {
        const brands = await Brand.findAll()
        return brands
    }
}

export default new BrandService()