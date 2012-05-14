var server = require("./server");
var router = require("./router");
var requestHandlers = require("./handlers");

var handle = {}
handle["/"] = requestHandlers.index;
handle["/cxx"] = requestHandlers.cxx;

var port = 4000;

server.start(router.route, handle, port);
