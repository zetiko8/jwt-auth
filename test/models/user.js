var Db = require('simulate-db')

module.exports = new Db(
    {
        username: 'String',
        password: 'String',
        jwt: 'String'
    },
    'username',
    [
        {
            username: 'anze',
            password: 'kolsek'
        },
        {
            username: 'ziga',
            password: 'sega'
        },
        {
            username: 'biba',
            password: 'cop'
        },
    ]
)