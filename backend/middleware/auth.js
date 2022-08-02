const JWT = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) => {

    const bearerToken = req.headers.authorization
    const token = bearerToken?.split(' ')[1]
    if (!token) return res.status(403).json({ error: true, message: "a token is required for authentication" })

    try {
        const decoded = JWT.verify(token, process.env.TOKEN_SECRET)
        req.user = decoded
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next()
}