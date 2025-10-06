import LORRequest from "../models/LOR.js"

export async function GetLORbyUserController(req, res) {
    try {

        if (req.user.role === "Admin" || req.user.role === "Approver") {
            const lorRequests = await LORRequest.find()
            return res.status(200).json({ message: "LOR Requests fetched successfully", lorRequests })
        }

        const lorRequests = await LORRequest.find({ studentId: req.user._id })
        return res.status(200).json({ message: "LOR Requests fetched successfully", lorRequests })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }
}