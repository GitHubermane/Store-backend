import { User } from "../../models/User.model"

export class UserDto {
    id
    email
    isActivated
    role
    constructor(model: User) {
        this.id = model.id
        this.email = model.email
        this.isActivated = model.isActivated
        this.role = model.role
    }
}
