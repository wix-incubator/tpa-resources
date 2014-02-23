var crypto = require("crypto");
var APP_SECRET = 'YOUR_APP_SECRET_GOES_HERE';
 
function verifyInstance(instance, secret) {
    // spilt the instance into signature and data
    var pair = instance.split('.');
    var signature = decode(pair[0], 'binary');
    var data = pair[1];
    // sign the data using hmac-sha1-256
    var hmac = crypto.createHmac('sha256', secret);
    var newSignature = hmac.update(data).digest('binary');
     
    return (signature === newSignature);
}
function decode(data, encoding) {
  encoding = encoding === undefined ? 'utf8' : encoding
  var buf = new Buffer(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64')
  return encoding ? buf.toString(encoding) : buf;
}
 
// usage
verifyInstance(instance, APP_SECRET);