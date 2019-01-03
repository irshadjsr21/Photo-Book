// Importing Extearnal Modules
const bodyParser = require('body-parser');
const cors = require('cors');

const addUser = require('./addUser');
const morgan = require('morgan');

module.exports = [

    // Body Parser to parse JSON
    bodyParser.json(),

    // Setting CORS
    cors(),
    addUser,
    morgan('dev')
]
