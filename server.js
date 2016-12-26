var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'application/json'});

    var address = req.headers['x-forwarded-for'] || 
                req.connection.remoteAddress || 
                req.socket.remoteAddress || 
                null;
    if(address && address.indexOf(',') != -1){
        address = address.slice(0, address.indexOf(','));
    }

    var lang = req.headers['accept-language'] || null;
    if(lang && lang.indexOf(',') != -1){
        lang = lang.slice(0, lang.indexOf(','));
    }
    
    var soft = req.headers['user-agent'] || null;
    if(soft && soft.indexOf('(') != -1){
        soft = soft.slice(soft.indexOf('(') + 1, soft.indexOf(')'));
    }    

    var headParsed = {
        ipaddress: address,
        language: lang,
        software: soft
    };

    res.end(JSON.stringify(headParsed));

}).listen(8080);