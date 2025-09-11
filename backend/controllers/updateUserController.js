import { UserRoles } from "./userRoles.js"

export async function UpdateUserController(req, res) {

    const { email, role, ...updateData } = req.body
    console.log(updateData)
}