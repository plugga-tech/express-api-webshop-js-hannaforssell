const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let connection = null; 

async function init() {
    let conn = await MongoClient.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true
    })

    this.connection = conn.db(process.env.MONGODB_DB);
}

module.exports = {
    connection,
    init
}
