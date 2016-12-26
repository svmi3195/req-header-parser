var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'application/json'});

    var address = req.headers.host || null;

    var lang = req.headers['accept-language'] || null;
    if(lang){
        lang = lang.slice(0, lang.indexOf(','));
    }
    
    var soft = req.headers['user-agent'] || null;
    if(soft){
        soft = soft.slice(soft.indexOf('(') + 1, soft.indexOf(')'));
    }    

    var headParsed = {
        ipaddress: address,
        language: lang,
        software: soft
    };

    res.end(JSON.stringify(headParsed));

}).listen(8080);