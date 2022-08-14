const express = require('express');
const app = express();
const events = require('./routes/events');

const { MongoClient } = require("mongodb")
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true });

const port = process.env.PORT || 5000;


app.use(express.json())
app.use('/api/v3/app', events);


async function main() {
    try {
        await client.connect().then(app.listen(port, () => { console.log('listening on port : ', port) }))

        module.exports.client=client;
    } catch (error) {
        console.error('error: ', error);
    }
}

main().catch(console.error);




