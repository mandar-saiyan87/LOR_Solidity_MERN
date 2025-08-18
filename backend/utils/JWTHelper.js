import jwt from "jsonwebtoken";


export function generateToken(user) {

    const token = jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            walletaddress: user.walletaddress,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    )
    return token
}

