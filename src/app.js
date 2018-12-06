/**
 * Middleware system for jwt authentication
 * @class 
 */
class authenticate {

    /**
     * Function that retrieves a User from db based on given primary key
     * @typedef getUser
     * @type {Function}
     * @param {string} key Primary key, by which the db will identify user
     */

    /**
     * Function that stores a User in db
     * @typedef saveUser
     * @type {Function}
     * @param {Object} data User data to insert example: { username: 'username', password: 'password' }
     * @param {saveUserCallback} cb 
     */

    /**
     * Constructor
     * @param {getUser} getUser 
     * @param {saveUser} saveUser 
     */
    constructor(getUser, saveUser) {
        this.getUser = getUser,
        this.saveUser = saveUser

        // Methods 
        this.signup = require('./signup')
    }
}

module.exports = authenticate