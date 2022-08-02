const ROUTER = require('express').Router()
const CONTROLLER = require('../controllers/user.js')


/**=================================================
 * Full CRUD routes for users
 * -------------------------------------------------
 */
ROUTER.route('/login').get(CONTROLLER.login) // log in user

ROUTER.route('/register').post(CONTROLLER.register) // register user

module.exports = ROUTER