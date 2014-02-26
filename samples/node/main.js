var wixapi = require('./wixconnect.js');
var https = require('https');

var SECRET_KEY = 'YOUR SECRET KEY';
var APP_ID = 'YOUR APPLICATION ID';
var INSTANCE_ID = 'YOUR INSTANCE ID';


var wr = wixapi.createRequest('GET', '/v1/activities/types', SECRET_KEY, APP_ID, INSTANCE_ID);
wr.asWixQueryParams();

var req = https.request(wr.toHttpsOptions(), function(res) {
    if(res.statusCode !== 200) {
        console.log('Could not get types')
    }
    res.on('data', function(d) {
        var response = JSON.parse(d.toString('utf8'));
        console.log(response);
    });
});
req.on('error', function(e) {
    if (e) {
        throw e;
    }
});
req.end();