/**
 * @module AuthenticateModule
 */

/**
 * Middleware system for jwt authentication
 * @class 
 */
class Authenticate {

    /**
     * Callback to run after user has been saved, and to handle errors
     * @callback saveUserCallback
     * @param {Object[]|Error} err - Array of invalid user input errors, or an internal Error
     * @param {string} err[].key - The key of singup data that was invalid
     * @param {string} err[].reason - Reason why the key was invalid  
     */

    /**
     * Function that retrieves a User from db based on given primary key
     * @typedef getUser
     * @type {Function}
     * @param {string} key - Primary key, by which the db will identify user
     */

    /**
     * Function that stores a User in db
     * @typedef saveUser
     * @type {Function}
     * @param {Object} data - User data to insert example: { username: 'username', password: 'password' }
     * @param {saveUserCallback} cb - Callback to run after user has been saved, and to handle errors
     */

    /**
     * Constructor
     * @param {getUser} getUser 
     * @param {saveUser} saveUser 
     */
    constructor(getUser, saveUser) {
        this.getUser = getUser
        this.saveUser = saveUser
        this.test = 3
    }

    /**
     * Middleware function for new user singup
     * @typedef signupMiddleware
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     */

    // Methods
    /**
     * Method that returns middleware function for new user singup
     * @name Authenticate#signup
     * @method 
     * @public
     * @returns {signupMiddleware} 
     */
    signup() {
        var self = this
        return function (req, res, next) {
            var user = {
                username: req.body.username,
                password: req.body.password
            }
            self.saveUser(user, function (err) {
                if (err) {
                    if (err === "user-policy") {
                        res.sendStatus(400)
                    }
                    else next(500)
                }
                else next()
            })
        }
    }

    login() {
        var self = this
        
    }
}

module.exports = Authenticate