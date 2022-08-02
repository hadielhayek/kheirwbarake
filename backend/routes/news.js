const ROUTER = require('express').Router()
const CONTROLLER = require('../controllers/news.js')



/**=================================================
 * Full CRUD routes for News Posts
 * -------------------------------------------------
 */
ROUTER.route('/').get(CONTROLLER.getPosts) // get all post

ROUTER.route('/').post(CONTROLLER.createPost) // create a new post

ROUTER.route('/:id').put(CONTROLLER.updatePost) // update a post by id

ROUTER.route('/:id').delete(CONTROLLER.deletePost) // delete a post by id


module.exports = ROUTER