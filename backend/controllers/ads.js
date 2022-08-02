const ads = require('../models/ads')
class controller {

    getAllAds(req, res, next) {
        ads.find((err, response) => {
            if (err) return next(err);
            res.status(200).json(response);
        })
    }

    get(req, res, next) {
        let { id } = req.params;
        ads.findOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).json({ sucess: true, response });
        })
    }

    post(req, res, next) {
        let body = req.body;
        let doc = new ads(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).json(response);
        })
    }



    async put(req, res, next) {
        let body = req.body;
        let { id } = req.params;
        ads.updateOne({ _id: id }, { $set: body }, (error, result) => {
            if (error) return next(error);
            res.send(result);
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        ads.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response })
        })
    }
}

const adscontroller = new controller();
module.exports = adscontroller;
