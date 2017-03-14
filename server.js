var express = require('express');
var app = express();

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

app.get('/', (req, res)=>{
    var now = new Date();
    var result = {};
    
    result.ipaddress = getClientIp(req);
    result.language = req.headers['accept-language'].split(',')[0];
    result.software = req.headers['user-agent'].match(/\(([^\)]+)\)/)[1];
    
    res.send(JSON.stringify(result));
});

app.listen(process.env.PORT || 5000);