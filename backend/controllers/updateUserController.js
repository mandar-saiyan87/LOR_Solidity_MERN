import { UserRoles } from "./userRoles.js"

export async function UpdateUserController(req, res) {

    const { email, role, ...updateData } = req.body
    // console.log(updateData)
    try {
        const UserModel = UserRoles[role.toLowerCase()]

        if (!UserModel) {
            return res.status(400).json({ message: "Invalid role" })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const updatedUser = await UserModel.findOneAndUpdate({ email }, updateData, { new: true })
        return res.status(200).json({ message: "User updated successfully", updatedUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }
}