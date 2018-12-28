// Importing Extearnal Modules
const bodyParser = require('body-parser');
const cors = require('cors');

const addUser = require('./addUser');
const config = require('../utils/config');


module.exports = [

    // Body Parser to parse JSON
    bodyParser.json(),

    // Setting CORS
    cors(),
    addUser
]