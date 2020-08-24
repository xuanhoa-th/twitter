require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
var Service = require('./services');
app.set('view engine', 'ejs');

app.use(express.static('public'));

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (request, response) => {
    response.render('index');
});

app.post('/search', async (req, res) => {
    var pageNumber = parseInt(req.body.page, 10) || 1;
    var searchKey = req.body.key;
    var filter = req.body.filter;
    var list = [];
    var message;
    try{
        list = await Service(pageNumber, searchKey, filter);
    } catch (error) {
        message = error;
    }
    if(message) { res.status(204).json(message); }
    else res.json(list);
});

app.get('/list-country', (request, response) => {
    var rawData = fs.readFileSync('country-list.json');
    var countryList = JSON.parse(rawData);
    return response.json(countryList);
})

// Start the server
const server = app.listen(process.env.APP_PORT, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});