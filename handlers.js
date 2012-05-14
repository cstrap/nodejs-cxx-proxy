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

// Proxy API
function get_body(getUrl, callback) {
    request_module(getUrl.href, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        util.log("Get uri success");
        callback(body, response.statusCode, false);
      } else {
        util.log("Get uri fail");
        var statusCode = response != undefined ? response.statusCode : "503";
        callback("", response, error);
      }
    });
}
// Handler
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
    util.log(queryObj);
    var parsedUrl = "";
    if (queryObj.uri != undefined) {
        parsedUrl = url.parse(queryObj.uri.replace(/\(|\)/g, ''), true);
        util.log("parsed url: " + parsedUrl);
        var cb = function(body, statusCode, error) {
            cxx.responseText = body;
            cxx.statusCode = statusCode;
            cxx.error = error;
            response.writeHead(200, {"Content-Type": "plain/text"});
            var responseString = util.format('"var CXX = "', cxx.toString()); 
            if (queryObj.callback != undefined) {
                responseString = util.format('%s(%s);', queryObj.callback, cxx.toString());
            }
            response.write(responseString);
            response.end();
        };
        setTimeout(cb, 5000);
        get_body(parsedUrl, cb);
    } else {
        response.writeHead(200, {"Content-Type": "plain/text"});
        response.write("// Error: no parameters given. //");
        response.end();
    }

}
