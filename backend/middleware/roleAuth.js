export function checkAdmin(req, res, next) {
    if (req.user.role === "Admin") {
        next()
    } else {
        return res.status(403).json({ message: "Not authorize to perform this operation" })
    }
}