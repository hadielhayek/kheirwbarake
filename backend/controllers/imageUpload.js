exports.getImageName = (req, res, next) => {

    const { file } = req
    try {
        // allowed file format
        const whitelist = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp'
        ]
        if (!whitelist.includes(file.mimetype)) { throw new Error('the file selected is not an image') }



        res.status(200).json(req.file.filename)
    }
    catch (err) {
        next({ status: 400, message: err.message })
    }
}