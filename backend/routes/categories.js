const ROUTER = require('express').Router()
const CONTROLLER = require('../controllers/categories')


/**=================================================
 * Get all Categories 
 * -------------------------------------------------
 */
ROUTER.route('/').get(CONTROLLER.getCategories) // get all post

module.exports = ROUTER