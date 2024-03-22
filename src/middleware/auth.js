

import jwt from "jsonwebtoken"
import userModel from "../../DB/models/user.model.js"


export const roles={
    Admin:'Admin',
    User:'User',
    }

export const auth = (roles = []) => {
    return async (req, res, next) => {
        const { token } = req.headers
        if (!token) {
            return res.status(404).json({ message: "token not found" })
        }
        if (!token.startsWith(process.env.BEARER_KRY)) {
            return res.status(400).json({ message: "invalid token" })
        }

        const baseToken = token.split(process.env.BEARER_KRY)[1]
        const decoded = jwt.verify(baseToken, process.env.SIGNATURE)

        if (!decoded) {
            return res.status(404).json({ message: "invalid signature" })
        }
        if (!decoded.id) {
            return res.status(400).json({ message: "invalid token payload" })
        }

        const user = await userModel.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        if (user.confirmed == false) {
            return res.status(404).json({ message: "please confirm first" })
        }
        if (user.loggedIn == false) {
            return res.status(404).json({ message: "please log in first" })
        }
        if (!roles.includes(user.role)) {
            return res.status(404).json({ message: "not auth" })
        }

        if (parseInt(user?.changePasswordAt?.getTime() / 1000) > decoded.iat) {
            return res.status(404).json({ message: "token expire" })
        }
        req.user = user
        next()
    }
}








