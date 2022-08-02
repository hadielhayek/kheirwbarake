const newsPost = require('../models/news')






/**===========================================================
 * get all news posts in the data base and return them as JSON
 * ----------------------------------------------------------- 
 */exports.getPosts = async (req, res) => {
    try {
        const Posts = await newsPost.find({}, null, { sort: { date: -1 } })
        res.status(200).json(Posts)
    }
    catch {
        res.status(500).json({
            error: true,
            message: 'a server error occurred while fetching posts'
        })
    }
}

/**=================================================
 * create a new post - data are sent in request body
 * -------------------------------------------------
 */exports.createPost = async (req, res) => {
    try {
        const { title, body, link = null, image = null } = req.body
        const { file } = req

        if (title === undefined || title === null) throw new Error('title of post can not be empty!')
        if (body === undefined || body === null) throw new Error('body of post can not be empty!')


        const newPost = {
            title: title,
            body: body,
            link: link,
            image: image
        }


        await newsPost.create(newPost).then((response) => { res.status(200).json(response) }).catch(() => { throw new Error('an internal server error occurred') })

    }
    catch (err) {
        res.status(400)
            .json({
                error: true,
                message: err.message
            })
    }
}


/**=================================================
 * create a new post - data are sent in request body
 * -------------------------------------------------
 */exports.updatePost = async (req, res, next) => {
    const id = req.params.id

    try {
        const doc = await newsPost.findById(id)
        doc.overwrite(req.body)
        await doc.save()
        res.status(200).send({ error: false, response: `post with title: '${req.body.title}' was successfully updated` })
    }
    catch (err) {
        next(err)
    }
}


/**=================================================
 * find post by id and delete it
 * -------------------------------------------------
 */exports.deletePost = async (req, res, next) => {
    const id = req.params.id
    try {
        await newsPost.findByIdAndDelete(id)
        res.status(200).json({ success: true, response: `Post with id: '${id}' was deleted successfully` })
    }
    catch (err) {
        next(err)
    }
}
