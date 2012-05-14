var querystring = require("querystring"),
    url = require("url"),
    http = require("http"),
    request_module = require('request'),
    util = require('util');

// Index handler, show documentation - TODO
exports.index = function(request, response) {
    console.log("Request handler 'index'");
    
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<h1>CXX API</h1>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

// Handler

var spawn = require("child_process").spawn;

exports.cxx = function(request, response) {
    util.log("Request for handler 'cxx'");
    var cxx = {
        "responseText": "Not found",
        "status": "404",
        "request": request.url,
        "error": false,
        "toString": function() {
                return JSON.stringify(this);
        }
    };
    var queryObj = url.parse(request.url, true).query;
    var parsedUrl = "";
    if (queryObj.uri != undefined) {
        parsedUrl = url.parse(queryObj.uri.replace(/\(|\)/g, ''), true);
        
        util.log("URI: " + parsedUrl.href);

        var response_callback = function(body, statusCode, error) {
            cxx.responseText = body;
            cxx.statusCode = statusCode;
            cxx.error = error;
            util.log("-----------------------------------------------");
            util.log("JSON Object");
            util.log(" - statusCode: " + cxx.statusCode);
            util.log(" - error     : " + cxx.error);
            util.log(" - toString  : " + cxx.toString());
            util.log("-----------------------------------------------");
            response.writeHead(200, {"Content-Type": "plain/text"});
            var responseString = util.format('var CXX = %s', cxx.toString()); 
            if (queryObj.callback != undefined) {
                responseString = util.format('%s(%s);', queryObj.callback, cxx.toString());
            }
            util.log(responseString);
            response.write(responseString);
            response.end();
        };

        request_module({uri: parsedUrl.href, timeout: 2000}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            util.log("Get uri success");
            response_callback(body, response.statusCode, false);
          } else {
            util.log("Get uri fail");
            var statusCode = response != undefined ? response.statusCode : "503";
            response_callback("", statusCode, error);
          }
        });
        
    } else {
        util.log("URI: NULL");
        response.writeHead(200, {"Content-Type": "plain/text"});
        response.write("// Error: no parameters given. //");
        response.end();
    }

}
