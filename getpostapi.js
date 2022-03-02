const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const database = 'e-comm';
const client = new MongoClient(url);
const express = require('express');
const app = express();

async function toConnect() {
    let result = await client.connect();
    let db = result.db(database);
    return (db.collection('products'));
}

app.use(express.json());

app.get('/', async (req, resp) => {
    let connect = await toConnect();
    let show = await connect.find({}).toArray();
    resp.send(show);

}).listen(4000);

app.post('/', async (req, resp) => {

    let connect = await toConnect();
    let result = connect.insert(req.body);
    //console.log(req.body);
    //resp.send(req.body);

}).listen(6000);
