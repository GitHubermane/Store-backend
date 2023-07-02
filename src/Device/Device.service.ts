import { UploadedFile } from "express-fileupload"
import path from "path"
import fs from "fs"
import { v4 } from "uuid"
import { ApiError } from "../error/ApiError"
import { Op } from "sequelize"
import { Device, DeviceInfo } from "../../models/Device.model"

class DeviceService {
    async create(device: Device, file: UploadedFile) {
        if (!file) throw ApiError.badRequest('Изображение необходимо')
        let filename = v4() + '.jpg'
        file.mv(path.resolve(__dirname, '..', 'static', filename))
        const createdDevice = await Device.create({ ...device, img: filename })
        if (device.info) {
            device.info = JSON.parse(String(device.info))
            device.info.forEach((i: DeviceInfo) => {
                DeviceInfo.create({
                    id: createdDevice.id,
                    title: i.title,
                    describe: i.describe
                })
            });
        }
        return createdDevice
    }

    async getAll(queryParams: qs.ParsedQs) {
        let { brandId, typeId, name } = queryParams
        let limit = Number(queryParams.limit) || 18
        let page = Number(queryParams.page) || 1
        let offset = page * limit - limit
        let devices
        if (!brandId && !typeId) {
            if (name) {
                return devices = await Device.findAndCountAll({ where: { name: { [Op.startsWith]: String(name) } } })
            }
            devices = await Device.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) devices = await Device.findAndCountAll({ where: { brandId: Number(brandId) }, limit, offset })
        if (!brandId && typeId) devices = await Device.findAndCountAll({ where: { typeId: Number(typeId) }, limit, offset })
        if (brandId && typeId) devices = await Device.findAndCountAll({ where: { brandId: Number(brandId), typeId: Number(typeId) }, limit, offset })

        return devices
    }

    async getOne(id: string) {
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }]
        })

        return device
    }

    async deleteOne(id: string) {
        let device = await Device.findOne({ where: { id } })
        fs.unlink(`${__dirname}/../static/${device?.img}`, err => {
            if (err) throw err
        })
        await Device.destroy({ where: { id } })

        return device
    }

    async deleteAll() {
        const devices = await Device.destroy({
            cascade: true,
            truncate: true,
            force: true
        })
        const directory = `${__dirname}/../static/`

        fs.readdir(directory, (err, files) => {
            if (err) throw err

            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        })

        return devices
    }
}

export default new DeviceService()