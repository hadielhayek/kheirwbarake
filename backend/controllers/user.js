const userDB = require("../models/user")
const bcrypt = require("bcrypt")
const JWT = require('jsonwebtoken')

/**=================================================
 * user log-in controller
 * -------------------------------------------------
 */exports.login = async (req, res, next) => {

    try {
        const { username, password } = req.body
        if (!username || !password) return res.status(400).json({ error: true, message: "username and password are required" })

        // check if the user name is found in database and 
        const user = await userDB.findOne({ username: username })
        if (!user) return res.status(401).json({ error: true, message: "wrong username or password" })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password)

        // generate a token and send it to user after confirming password
        if (isPasswordCorrect) {
            const token = JWT.sign(
                {
                    username
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "30d"
                })
            return res.status(200).json({ error: false, response: { _id: user._id, username, token } })
        }
        // send invalid credentials because of wrong user name or password
        else return res.status(401).json({ error: true, message: 'wrong username or password' })
    }
    catch (err) {
        next(err)
    }
}

/**=================================================
 * user register controller
 * -------------------------------------------------
 */exports.register = async (req, res, next) => {

    try {
        // get inputted data from user
        const { username, password } = req.body
        if (!username) return res.status(400).json({ error: true, message: "username is required" })
        if (!password) return res.status(400).json({ error: true, message: "password is required" })

        // check if user is already exist
        const oldUser = await userDB.findOne({ username }).catch(err => next(err))
        if (oldUser) return res.status(409).json({ error: true, message: "username already exist" })

        // hash password using bcrypt
        const encryptedPassword = await bcrypt.hash(password, 10)

        // create the new user in the database
        const user = await userDB.create({
            username,
            password: encryptedPassword
        }).catch(err => next(err))

        // generate a token for the new user
        const token = JWT.sign(
            {
                username
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "30d"
            })

        // send user name and token 
        return res.status(200).json({ error: false, response: { _id: user._id, username, token } })
    }
    catch (err) {
        next(err)
    }
}

