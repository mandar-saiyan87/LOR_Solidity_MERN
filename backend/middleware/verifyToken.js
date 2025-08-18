import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export function verifyToken(req, res, next) {

    const authToken = req.headers['authorization']

    if (!authToken) {
        return res.status(401).json({ message: "Access denied" })
    }

    const token = authToken.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Access denied" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: "Access denied" })
    }
}